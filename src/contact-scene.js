export function initContactScene({ canvas, trigger, panel, received }) {
  if (!canvas) return createNoopScene();

  const gl = canvas.getContext("webgl", { alpha: true, antialias: true, preserveDrawingBuffer: false });
  if (!gl) return createNoopScene();

  const lineProgram = createProgram(gl, lineVertexShader, lineFragmentShader);
  const textureProgram = createProgram(gl, textureVertexShader, textureFragmentShader);
  const pointProgram = createProgram(gl, pointVertexShader, pointFragmentShader);
  const lineLocations = getLocations(gl, lineProgram, ["a_position", "a_color"], ["u_matrix"]);
  const textureLocations = getLocations(gl, textureProgram, ["a_position", "a_texcoord", "a_shade"], ["u_matrix", "u_texture", "u_alpha"]);
  const pointLocations = getLocations(gl, pointProgram, ["a_position", "a_color", "a_size"], ["u_matrix"]);
  const lineBuffer = gl.createBuffer();
  const lineColorBuffer = gl.createBuffer();
  const texturePositionBuffer = gl.createBuffer();
  const textureCoordBuffer = gl.createBuffer();
  const textureShadeBuffer = gl.createBuffer();
  const pointBuffer = gl.createBuffer();
  const pointColorBuffer = gl.createBuffer();
  const pointSizeBuffer = gl.createBuffer();
  const textureState = createTextureState(gl);
  const curveLayer = document.getElementById("contact-energy-curves");
  const curvePaths = createContactCurvePaths(curveLayer);
  loadCubeTexture(gl, textureState, canvas.dataset.textureSrc || "public/generated/images/contact/contact-cube-face-512-20260614.webp");

  const state = {
    progress: 0,
    phase: 0,
    hover: false,
    explodeStart: 0,
    formReadyAt: 0,
    energyLines: [],
    onFormReady: null,
    receivedUntil: 0,
    prefersReducedMotion: window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false,
    dpr: 1,
    width: 1,
    height: 1
  };
  window.__contactSceneProbe = () => ({
    width: state.width,
    height: state.height,
    phase: state.phase,
    progress: Number(state.progress.toFixed(4)),
    hover: state.hover,
    particles: 0,
    energyLines: state.energyLines.length,
    textureReady: textureState.ready,
    textureFilter: textureState.filter,
    idleRotationSpeed: CONTACT_IDLE_ROTATION_SPEED,
    hasWebgl: true
  });

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const api = {
    setScrollProgress(progress) {
      state.progress = clamp(progress, 0, 1);
    },
    setPhase(phase) {
      state.phase = phase;
    },
    setHover(value) {
      state.hover = value;
    },
    explodeToForm(onFormReady) {
      const now = performance.now();
      state.explodeStart = now;
      state.formReadyAt = now + (state.prefersReducedMotion ? 80 : 2450);
      state.onFormReady = onFormReady;
      state.energyLines = createContactEnergyLines(state);
    },
    showReceivedMessage() {
      showReceived(received, state);
    }
  };

  trigger?.addEventListener("mouseenter", () => api.setHover(true));
  trigger?.addEventListener("mouseleave", () => api.setHover(false));
  trigger?.addEventListener("focus", () => api.setHover(true));
  trigger?.addEventListener("blur", () => api.setHover(false));

  function render(now) {
    if (document.hidden) {
      requestAnimationFrame(render);
      return;
    }

    try {
      resizeCanvas(gl, canvas, state);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const matrix = ortho(0, state.width, state.height, 0, -1000, 1000);
      drawTexturedCube(gl, state, matrix, textureProgram, textureLocations, texturePositionBuffer, textureCoordBuffer, textureShadeBuffer, textureState, now);
      drawCube(gl, state, matrix, lineProgram, lineLocations, lineBuffer, lineColorBuffer, now, textureState.ready ? 0.42 : 1);
      if (!textureState.ready) drawCubePoints(gl, state, matrix, pointProgram, pointLocations, pointBuffer, pointColorBuffer, pointSizeBuffer, now);
      drawContactEnergyCurves(state, curveLayer, curvePaths, now);

      if (state.onFormReady && state.formReadyAt && now >= state.formReadyAt) {
        const ready = state.onFormReady;
        state.onFormReady = null;
        state.formReadyAt = 0;
        ready();
      }

      if (received && !received.hidden && now > state.receivedUntil) {
        received.classList.remove("is-visible");
        setTimeout(() => {
          if (!received.classList.contains("is-visible")) received.hidden = true;
        }, 220);
      }
    } catch (error) {
      window.__contactSceneError = String(error?.message || error);
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
  return api;
}

function drawCubePoints(gl, state, matrix, program, locations, pointBuffer, colorBuffer, sizeBuffer, now) {
  const { cx, cy, size } = getCubeMetrics(state);
  const phaseColor = getPhaseColor(state.phase);
  const steel = [0.58, 0.66, 0.7, state.hover ? 0.72 : 0.5];
  const cool = [0.22, 0.74, 1, state.hover ? 0.72 : 0.46];
  const { rotationX, rotationY } = getCubeRotation(state, now);
  const cubeMatrix = multiply(matrix, multiply(translate(cx, cy, 0), multiply(rotateY(rotationY), multiply(rotateX(rotationX), scale(size, size, size)))));
  const vertices = [...cubePointCloud, ...cubePanelPoints, ...iconLines[state.phase % iconLines.length]].flat();
  const colors = [];
  const sizes = [];
  for (let i = 0; i < vertices.length / 3; i += 1) {
    const color = i % 7 === 0 ? phaseColor : i % 5 === 0 ? cool : steel;
    colors.push(color[0], color[1], color[2], color[3]);
    sizes.push(state.hover ? 3.8 : 3.1);
  }
  drawPointCloud(gl, cubeMatrix, program, locations, pointBuffer, colorBuffer, sizeBuffer, vertices, colors, sizes);
}

function createNoopScene() {
  return {
    setScrollProgress() {},
    setPhase() {},
    setHover() {},
    explodeToForm(callback) {
      callback?.();
    },
    showReceivedMessage() {}
  };
}

function drawTexturedCube(gl, state, matrix, program, locations, positionBuffer, texcoordBuffer, shadeBuffer, textureState, now) {
  const { cx, cy, size } = getCubeMetrics(state);
  const { rotationX, rotationY } = getCubeRotation(state, now);
  const cubeMatrix = multiply(matrix, multiply(translate(cx, cy, 0), multiply(rotateY(rotationY), multiply(rotateX(rotationX), scale(size, size, size)))));

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.useProgram(program);
  gl.uniformMatrix4fv(locations.u_matrix, false, new Float32Array(cubeMatrix));
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textureState.texture);
  gl.uniform1i(locations.u_texture, 0);
  gl.uniform1f(locations.u_alpha, textureState.ready ? (state.hover ? 1 : 0.96) : 0.26);
  bindFloatAttribute(gl, positionBuffer, locations.a_position, texturedCubeGeometry.positions, 3);
  bindFloatAttribute(gl, texcoordBuffer, locations.a_texcoord, texturedCubeGeometry.texcoords, 2);
  bindFloatAttribute(gl, shadeBuffer, locations.a_shade, texturedCubeGeometry.shades, 1);
  gl.drawArrays(gl.TRIANGLES, 0, texturedCubeGeometry.positions.length / 3);
  gl.disable(gl.DEPTH_TEST);
}

function drawCube(gl, state, matrix, program, locations, lineBuffer, colorBuffer, now, alphaScale = 1) {
  const { cx, cy, size } = getCubeMetrics(state);
  const phaseColor = getPhaseColor(state.phase);
  const metal = [0.72, 0.78, 0.8, (state.hover ? 0.22 : 0.12) * alphaScale];
  const blue = [0.22, 0.74, 1, (state.hover ? 0.32 : 0.2) * alphaScale];
  const ember = [1, 0.54, 0.1, (state.hover ? 0.34 : 0.16) * alphaScale];
  const { rotationX, rotationY } = getCubeRotation(state, now);
  const cubeMatrix = multiply(matrix, multiply(translate(cx, cy, 0), multiply(rotateY(rotationY), multiply(rotateX(rotationX), scale(size, size, size)))));

  drawLineSegments(gl, cubeMatrix, program, locations, lineBuffer, colorBuffer, cubeEdges, metal, ember);
  if (alphaScale >= 0.95) {
    drawLineSegments(gl, cubeMatrix, program, locations, lineBuffer, colorBuffer, cubeDetailLines, metal, blue);
    drawLineSegments(gl, cubeMatrix, program, locations, lineBuffer, colorBuffer, cubeCircuitLines, ember, phaseColor);
    drawLineSegments(gl, cubeMatrix, program, locations, lineBuffer, colorBuffer, iconLines[state.phase % iconLines.length], ember, blue);
  }
}

function drawContactEnergyLines(gl, state, matrix, program, locations, lineBuffer, colorBuffer, now) {
  if (!state.explodeStart || !state.energyLines.length) return;
  const duration = state.prefersReducedMotion ? 760 : 3300;
  const t = clamp((now - state.explodeStart) / duration, 0, 1);
  const positions = [];
  const colors = [];

  for (const line of state.energyLines) {
    const local = clamp((t - line.delay) / Math.max(0.001, 1 - line.delay), 0, 1);
    if (local <= 0) continue;

    const reveal = smoothstep(clamp(local / 0.86, 0, 1));
    const fade = clamp(local / 0.16, 0, 1) * (1 - clamp((local - 0.92) / 0.08, 0, 1)) * 0.52;
    appendEnergyLineSegments(positions, colors, state, line, reveal, fade, now);
  }

  if (positions.length) {
    gl.useProgram(program);
    gl.uniformMatrix4fv(locations.u_matrix, false, new Float32Array(matrix));
    bindFloatAttribute(gl, lineBuffer, locations.a_position, new Float32Array(positions), 3);
    bindFloatAttribute(gl, colorBuffer, locations.a_color, new Float32Array(colors), 4);
    gl.lineWidth(1);
    gl.drawArrays(gl.LINES, 0, positions.length / 3);
  }

  if (t >= 1) {
    state.explodeStart = 0;
    state.energyLines = [];
  }
}

function drawContactEnergyCurves(state, layer, paths, now) {
  if (!layer || !paths.length) return;
  if (!state.explodeStart || !state.energyLines.length) {
    layer.style.opacity = "0";
    for (const path of paths) path.setAttribute("d", "");
    return;
  }

  const duration = state.prefersReducedMotion ? 760 : 3300;
  const t = clamp((now - state.explodeStart) / duration, 0, 1);
  layer.setAttribute("viewBox", `0 0 ${state.width} ${state.height}`);
  layer.style.opacity = "1";

  for (let index = 0; index < paths.length; index += 1) {
    const path = paths[index];
    const line = state.energyLines[index];
    if (!line) {
      path.setAttribute("d", "");
      continue;
    }

    const local = clamp((t - line.delay) / Math.max(0.001, 1 - line.delay), 0, 1);
    if (local <= 0) {
      path.setAttribute("d", "");
      continue;
    }

    const reveal = smoothstep(clamp(local / 0.86, 0, 1));
    const trailStart = Math.max(0, reveal - 0.32);
    const d = makeContactCurvePath(state, line, trailStart, reveal, now);
    const fade = clamp(local / 0.16, 0, 1) * (1 - clamp((local - 0.92) / 0.08, 0, 1)) * 0.72;
    const color = mixColor(line.colorA, line.colorB, reveal);

    path.setAttribute("d", d);
    path.setAttribute("stroke", colorToCss(color));
    path.style.opacity = String(fade);
  }

  if (t >= 1) {
    state.explodeStart = 0;
    state.energyLines = [];
    layer.style.opacity = "0";
    for (const path of paths) path.setAttribute("d", "");
  }
}

function createContactCurvePaths(layer) {
  if (!layer) return [];
  layer.innerHTML = "";
  return Array.from({ length: CONTACT_ENERGY_LINE_COUNT }, (_, index) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.classList.add("contact-energy-curve");
    path.style.opacity = "0";
    path.setAttribute("stroke", colorToCss(SITE_PARTICLE_COLORS[index % SITE_PARTICLE_COLORS.length]));
    layer.appendChild(path);
    return path;
  });
}

function drawPointCloud(gl, matrix, program, locations, pointBuffer, colorBuffer, sizeBuffer, positions, colors, sizes) {
  gl.useProgram(program);
  gl.uniformMatrix4fv(locations.u_matrix, false, new Float32Array(matrix));
  bindFloatAttribute(gl, pointBuffer, locations.a_position, new Float32Array(positions), 3);
  bindFloatAttribute(gl, colorBuffer, locations.a_color, new Float32Array(colors), 4);
  bindFloatAttribute(gl, sizeBuffer, locations.a_size, new Float32Array(sizes), 1);
  gl.drawArrays(gl.POINTS, 0, positions.length / 3);
}

function drawLineSegments(gl, matrix, program, locations, lineBuffer, colorBuffer, lines, primary, secondary) {
  const positions = new Float32Array(lines.flat());
  const colors = [];
  for (let i = 0; i < positions.length / 3; i += 1) {
    const color = i % 2 === 0 ? primary : secondary;
    colors.push(color[0], color[1], color[2], color[3]);
  }

  gl.useProgram(program);
  gl.uniformMatrix4fv(locations.u_matrix, false, new Float32Array(matrix));
  bindFloatAttribute(gl, lineBuffer, locations.a_position, positions, 3);
  bindFloatAttribute(gl, colorBuffer, locations.a_color, new Float32Array(colors), 4);
  gl.lineWidth(1);
  gl.drawArrays(gl.LINES, 0, positions.length / 3);
}

function createTextureState(gl) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([30, 16, 6, 255])
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return { texture, ready: false, width: 1, height: 1, filter: "placeholder" };
}

function loadCubeTexture(gl, textureState, src) {
  const image = new Image();
  image.onload = () => {
    const textureSource = createSmoothedTextureSource(image, 512);
    gl.bindTexture(gl.TEXTURE_2D, textureState.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureSource);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.generateMipmap(gl.TEXTURE_2D);
    applyAnisotropicFiltering(gl);
    textureState.width = image.naturalWidth;
    textureState.height = image.naturalHeight;
    textureState.filter = "mipmap-512";
    textureState.ready = true;
  };
  image.onerror = () => {
    window.__contactSceneTextureError = src;
  };
  image.src = src;
}

function createSmoothedTextureSource(image, size) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, size, size);
  return canvas;
}

function applyAnisotropicFiltering(gl) {
  const extension = gl.getExtension("EXT_texture_filter_anisotropic")
    || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic")
    || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
  if (!extension) return;

  const max = gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT) || 1;
  gl.texParameterf(gl.TEXTURE_2D, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(4, max));
}

function createContactEnergyLines(state) {
  const { cx, cy, size } = getCubeMetrics(state);
  const target = getFormTarget(state);
  const groupSplit = {
    x: lerp(cx, target.x, 0.5),
    y: lerp(cy, target.y, 0.56)
  };
  const groupControlA = {
    x: Math.max(cx + size * 4.4, state.width * 0.14),
    y: Math.max(cy + size * 1.5, state.height * 0.16)
  };
  const groupControlB = {
    x: Math.max(cx + size * 5.6, state.width * 0.2),
    y: Math.min(state.height * 0.82, target.y + target.h * 0.3)
  };
  return Array.from({ length: CONTACT_ENERGY_LINE_COUNT }, (_, index) => {
    const ratio = index / Math.max(1, CONTACT_ENERGY_LINE_COUNT - 1);
    const colorA = SITE_PARTICLE_COLORS[index % SITE_PARTICLE_COLORS.length];
    const colorB = SITE_PARTICLE_COLORS[(index + 2) % SITE_PARTICLE_COLORS.length];
    const targetPoint = getContactCurvedTilePoint(target, index, 0);
    const surround = getContactCurvedTilePoint(target, index, 1);
    return {
      source: {
        x: cx + size * 1.24,
        y: cy + (ratio - 0.5) * size * 0.62
      },
      groupControlA,
      groupControlB,
      groupSplit,
      surround,
      target: targetPoint,
      delay: ratio * 0.045,
      offset: (index - (CONTACT_ENERGY_LINE_COUNT - 1) / 2) * 5.5,
      coilAngle: ratio * Math.PI * 2,
      coilRadius: Math.min(30, Math.max(14, size * 1.12)) * (0.82 + ratio * 0.36),
      wave: Math.min(48, Math.max(22, state.width * 0.032)) * (0.7 + ratio * 0.28),
      phase: Math.random() * Math.PI * 2,
      colorA,
      colorB
    };
  });
}

function appendEnergyLineSegments(positions, colors, state, line, reveal, alpha, now) {
  const segments = 72;
  const maxSegment = Math.max(1, Math.floor(segments * reveal));
  const trailStart = Math.max(0, reveal - 0.32);
  const firstSegment = Math.max(0, Math.floor(segments * trailStart));
  const time = now * 0.0022 + line.phase;

  for (let i = firstSegment; i < maxSegment; i += 1) {
    const a = i / segments;
    const b = (i + 1) / segments;
    const start = getContactEnergyPoint(state, line, a, time);
    const end = getContactEnergyPoint(state, line, b, time);
    const colorStart = mixColor(line.colorA, line.colorB, a);
    const colorEnd = mixColor(line.colorA, line.colorB, b);
    const trailProgress = clamp((b - trailStart) / Math.max(0.001, reveal - trailStart), 0, 1);
    const edgeFade = Math.sin(trailProgress * Math.PI);
    const segmentAlpha = alpha * (0.16 + edgeFade * 0.38);

    positions.push(start.x, start.y, 0, end.x, end.y, 0);
    colors.push(colorStart[0], colorStart[1], colorStart[2], segmentAlpha);
    colors.push(colorEnd[0], colorEnd[1], colorEnd[2], segmentAlpha);
  }
}

function makeContactCurvePath(state, line, start, end, now) {
  const span = Math.max(0.001, end - start);
  const sampleCount = Math.max(8, Math.ceil(span * 42));
  const time = now * 0.0022 + line.phase;
  const points = [];

  for (let i = 0; i <= sampleCount; i += 1) {
    const t = lerp(start, end, i / sampleCount);
    points.push(getContactEnergyPoint(state, line, t, time));
  }

  return makeSmoothBezierPath(points);
}

function makeSmoothBezierPath(points) {
  if (points.length < 2) return "";
  let d = `M ${formatPoint(points[0])}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1 = {
      x: p1.x + (p2.x - p0.x) / 6,
      y: p1.y + (p2.y - p0.y) / 6
    };
    const c2 = {
      x: p2.x - (p3.x - p1.x) / 6,
      y: p2.y - (p3.y - p1.y) / 6
    };
    d += ` C ${formatPoint(c1)}, ${formatPoint(c2)}, ${formatPoint(p2)}`;
  }

  return d;
}

function formatPoint(point) {
  return `${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
}

function getContactEnergyPoint(state, line, t, time) {
  if (t < 0.5) return getContactGroupedSnakePoint(line, smoothstep(t / 0.5), time);
  if (t < 0.82) return getContactSeparatePoint(line, smoothstep((t - 0.5) / 0.32), time);
  return getContactGatherPoint(line.surround, line.target, smoothstep((t - 0.82) / 0.18), line, time);
}

function getContactGroupedSnakePoint(line, local, time) {
  const center = cubicBezier(line.source, line.groupControlA, line.groupControlB, line.groupSplit, local);
  const forward = cubicBezier(line.source, line.groupControlA, line.groupControlB, line.groupSplit, clamp(local + 0.015, 0, 1));
  const direction = getEnergyDirection(center, forward);
  const escape = smoothstep(clamp(local / 0.1, 0, 1));
  const coil = line.coilAngle + local * Math.PI * 5.4 + time * 0.52;
  const radius = line.coilRadius * escape * (0.82 + Math.sin(local * Math.PI * 2 + line.phase) * 0.12);
  const snake = Math.sin(local * Math.PI * 4.1 + line.phase + time * 0.24) * line.wave * 0.28 * Math.sin(local * Math.PI);

  return {
    x: center.x + direction.nx * (Math.cos(coil) * radius + snake) + direction.dx * Math.sin(coil) * radius * 0.45,
    y: center.y + direction.ny * (Math.cos(coil) * radius + snake) + direction.dy * Math.sin(coil) * radius * 0.45
  };
}

function getContactSeparatePoint(line, local, time) {
  const source = getContactGroupedSnakePoint(line, 1, time);
  const base = getEnergyBezierPoint(source, line.surround, local, line.offset * 0.48);
  const direction = getEnergyDirection(source, line.surround);
  const envelope = Math.sin(local * Math.PI);
  const wave = Math.sin(local * Math.PI * 2.7 + line.phase + time * 0.18) * line.wave * 0.42 * envelope;

  return {
    x: base.x + direction.nx * wave,
    y: base.y + direction.ny * wave
  };
}

function getContactGatherPoint(source, target, local, line, time) {
  const base = getEnergyBezierPoint(source, target, local, line.offset * 0.42);
  const direction = getEnergyDirection(source, target);
  const envelope = Math.sin(local * Math.PI) * (1 - local * 0.4);
  const wave = Math.sin(local * Math.PI * 2.4 + line.phase + time * 0.22) * line.wave * 0.36 * envelope;
  return {
    x: base.x + direction.nx * wave,
    y: base.y + direction.ny * wave
  };
}

function getContactCurvedTilePoint(target, index, ring) {
  const count = CONTACT_ENERGY_LINE_COUNT;
  const ratio = index / count;
  const angle = -Math.PI * 0.56 + ratio * Math.PI * 2;
  const radiusX = target.w * (ring ? 0.64 : 0.46);
  const radiusY = target.h * (ring ? 0.58 : 0.43);
  const softness = ring ? 0.88 : 0.72;
  const innerWave = ring ? 0 : Math.sin(angle * 2 + index * 0.37) * Math.min(target.w, target.h) * 0.035;

  return {
    x: target.x + Math.cos(angle) * radiusX * softness + Math.cos(angle + Math.PI * 0.5) * innerWave,
    y: target.y + Math.sin(angle) * radiusY + Math.sin(angle + Math.PI * 0.5) * innerWave * 0.65
  };
}

function getEnergyBezierPoint(source, target, t, offset) {
  const direction = target.x >= source.x ? 1 : -1;
  const distance = Math.abs(target.x - source.x);
  const bend = Math.min(280, distance * 0.34 + 72);
  return cubicBezier(
    source,
    { x: source.x + bend * direction, y: source.y + offset },
    { x: target.x - bend * 0.74 * direction, y: target.y - offset },
    target,
    t
  );
}

function getEnergyDirection(source, target) {
  const dxRaw = target.x - source.x;
  const dyRaw = target.y - source.y;
  const length = Math.max(1, Math.hypot(dxRaw, dyRaw));
  const dx = dxRaw / length;
  const dy = dyRaw / length;
  return { dx, dy, nx: -dy, ny: dx };
}

function showReceived(received, state) {
  if (!received) return;
  received.hidden = false;
  state.receivedUntil = performance.now() + 3200;
  requestAnimationFrame(() => received.classList.add("is-visible"));
}

function getCubeMetrics(state) {
  const size = Math.min(22, Math.max(16, state.width * 0.016));
  return {
    cx: Math.max(32, Math.min(43, state.width * 0.032)),
    cy: Math.max(32, Math.min(43, state.width * 0.032)),
    size
  };
}

function getCubeRotation(state, now) {
  const idle = state.prefersReducedMotion ? 0 : now * CONTACT_IDLE_ROTATION_SPEED;
  return {
    rotationY: state.progress * Math.PI * 5.4 + idle,
    rotationX: 0.52 + Math.sin(state.progress * Math.PI * 3) * 0.16 + Math.sin(idle * 0.7) * 0.08
  };
}

function getFormTarget(state) {
  const width = Math.min(560, Math.max(310, state.width - 48));
  const height = Math.min(500, Math.max(390, state.height - 64));
  return {
    x: state.width * 0.5,
    y: state.height * 0.5,
    w: width,
    h: height
  };
}

function getSnakePoint(state, t, seed) {
  const { cx, cy } = getCubeMetrics(state);
  const target = getFormTarget(state);
  const start = { x: cx, y: cy };
  const controlA = {
    x: state.width * 0.86,
    y: state.height * (0.18 + Math.sin(seed) * 0.04)
  };
  const controlB = {
    x: state.width * 0.12,
    y: state.height * (0.82 + Math.cos(seed) * 0.035)
  };
  const end = { x: target.x, y: target.y };
  return cubicBezier(start, controlA, controlB, end, t);
}

function resizeCanvas(gl, canvas, state) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, window.innerWidth);
  const height = Math.max(1, window.innerHeight);
  if (canvas.width === Math.round(width * dpr) && canvas.height === Math.round(height * dpr)) return;
  state.dpr = dpr;
  state.width = width;
  state.height = height;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  gl.viewport(0, 0, canvas.width, canvas.height);
}

function bindFloatAttribute(gl, buffer, location, data, size) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
}

function getLocations(gl, program, attributes, uniforms) {
  return Object.fromEntries([
    ...attributes.map((name) => [name, gl.getAttribLocation(program, name)]),
    ...uniforms.map((name) => [name, gl.getUniformLocation(program, name)])
  ]);
}

function createProgram(gl, vertexSource, fragmentSource) {
  const program = gl.createProgram();
  gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  return program;
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
  return shader;
}

const lineVertexShader = `
  attribute vec3 a_position;
  attribute vec4 a_color;
  uniform mat4 u_matrix;
  varying vec4 v_color;
  void main() {
    gl_Position = u_matrix * vec4(a_position, 1.0);
    v_color = a_color;
  }
`;

const lineFragmentShader = `
  precision mediump float;
  varying vec4 v_color;
  void main() {
    gl_FragColor = v_color;
  }
`;

const textureVertexShader = `
  attribute vec3 a_position;
  attribute vec2 a_texcoord;
  attribute float a_shade;
  uniform mat4 u_matrix;
  varying vec2 v_texcoord;
  varying float v_shade;
  void main() {
    gl_Position = u_matrix * vec4(a_position, 1.0);
    v_texcoord = a_texcoord;
    v_shade = a_shade;
  }
`;

const textureFragmentShader = `
  precision mediump float;
  varying vec2 v_texcoord;
  varying float v_shade;
  uniform sampler2D u_texture;
  uniform float u_alpha;
  void main() {
    vec4 tex = texture2D(u_texture, v_texcoord);
    float ember = smoothstep(0.34, 0.94, tex.r - tex.b * 0.55);
    vec3 color = tex.rgb * v_shade + vec3(0.16, 0.05, 0.0) * ember;
    gl_FragColor = vec4(color, tex.a * u_alpha);
  }
`;

const pointVertexShader = `
  attribute vec3 a_position;
  attribute vec4 a_color;
  attribute float a_size;
  uniform mat4 u_matrix;
  varying vec4 v_color;
  void main() {
    gl_Position = u_matrix * vec4(a_position, 1.0);
    gl_PointSize = a_size;
    v_color = a_color;
  }
`;

const pointFragmentShader = `
  precision mediump float;
  varying vec4 v_color;
  void main() {
    vec2 p = gl_PointCoord - vec2(0.5);
    float alpha = smoothstep(0.5, 0.16, length(p));
    gl_FragColor = vec4(v_color.rgb, v_color.a * alpha);
  }
`;

const cubeEdges = [
  [-1, -1, -1], [1, -1, -1], [1, -1, -1], [1, 1, -1], [1, 1, -1], [-1, 1, -1], [-1, 1, -1], [-1, -1, -1],
  [-1, -1, 1], [1, -1, 1], [1, -1, 1], [1, 1, 1], [1, 1, 1], [-1, 1, 1], [-1, 1, 1], [-1, -1, 1],
  [-1, -1, -1], [-1, -1, 1], [1, -1, -1], [1, -1, 1], [1, 1, -1], [1, 1, 1], [-1, 1, -1], [-1, 1, 1]
];

const cubePointCloud = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
  [-0.33, -1, 1], [0.33, -1, 1], [-1, -0.33, 1], [-1, 0.33, 1], [1, -0.33, 1], [1, 0.33, 1], [-0.33, 1, 1], [0.33, 1, 1],
  [-0.33, -1, -1], [0.33, -1, -1], [-1, -0.33, -1], [-1, 0.33, -1], [1, -0.33, -1], [1, 0.33, -1], [-0.33, 1, -1], [0.33, 1, -1]
];

const CONTACT_ENERGY_LINE_COUNT = 10;
const CONTACT_IDLE_ROTATION_SPEED = 0.00026;
const SITE_PARTICLE_COLORS = [
  [0.2235, 0.7412, 0.9725],
  [1, 0.5412, 0.0941],
  [1, 0.7569, 0.3529],
  [0.8588, 0.9059, 0.9569],
  [1, 0.5412, 0.0941],
  [0.2235, 0.7412, 0.9725]
];

const texturedCubeGeometry = createTexturedCubeGeometry();
const cubeDetailLines = createCubeDetailLines();
const cubeCircuitLines = createCubeCircuitLines();
const cubePanelPoints = createCubePanelPoints();

const iconLines = [
  [[-0.55, -0.35, 1.05], [0.55, -0.35, 1.05], [0.55, -0.35, 1.05], [0.55, 0.35, 1.05], [0.55, 0.35, 1.05], [-0.55, 0.35, 1.05], [-0.55, 0.35, 1.05], [-0.55, -0.35, 1.05], [-0.48, -0.28, 1.06], [0, 0.08, 1.06], [0, 0.08, 1.06], [0.48, -0.28, 1.06]],
  [[0, -0.62, 1.05], [0, 0.62, 1.05], [-0.48, -0.22, 1.06], [-0.1, 0.02, 1.06], [0.1, 0.02, 1.06], [0.48, -0.22, 1.06], [-0.42, 0.32, 1.06], [-0.1, 0.16, 1.06], [0.1, 0.16, 1.06], [0.42, 0.32, 1.06]],
  [[-0.58, 0, 1.06], [0.46, -0.42, 1.06], [-0.58, 0, 1.06], [0.48, 0.42, 1.06], [0.46, -0.42, 1.06], [0.48, 0.42, 1.06], [-0.58, 0, 1.06], [-0.42, 0.16, 1.06], [0.46, -0.42, 1.06], [0.32, -0.28, 1.06], [0.48, 0.42, 1.06], [0.32, 0.28, 1.06]],
  [[-0.62, 0.32, 1.06], [-0.22, -0.14, 1.06], [-0.22, -0.14, 1.06], [0.1, 0.18, 1.06], [0.1, 0.18, 1.06], [0.62, -0.36, 1.06], [0.26, -0.36, 1.06], [0.62, -0.36, 1.06], [0.62, -0.36, 1.06], [0.62, 0.02, 1.06]],
  [[-0.42, -0.02, 1.06], [-0.42, -0.34, 1.06], [-0.42, -0.34, 1.06], [0.42, -0.34, 1.06], [0.42, -0.34, 1.06], [0.42, -0.02, 1.06], [-0.52, -0.02, 1.06], [0.52, -0.02, 1.06], [0.52, -0.02, 1.06], [0.52, 0.46, 1.06], [0.52, 0.46, 1.06], [-0.52, 0.46, 1.06], [-0.52, 0.46, 1.06], [-0.52, -0.02, 1.06]],
  [[-0.58, 0, 1.06], [0.58, -0.48, 1.06], [0.58, -0.48, 1.06], [0.24, 0.58, 1.06], [0.24, 0.58, 1.06], [-0.02, 0.12, 1.06], [-0.02, 0.12, 1.06], [-0.58, 0, 1.06], [-0.02, 0.12, 1.06], [0.58, -0.48, 1.06]]
];

function createTexturedCubeGeometry() {
  const positions = [];
  const texcoords = [];
  const shades = [];
  const faces = [
    { shade: 1, corners: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]] },
    { shade: 0.54, corners: [[1, -1, -1], [-1, -1, -1], [-1, 1, -1], [1, 1, -1]] },
    { shade: 0.72, corners: [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]] },
    { shade: 0.82, corners: [[1, -1, 1], [1, -1, -1], [1, 1, -1], [1, 1, 1]] },
    { shade: 0.94, corners: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]] },
    { shade: 0.62, corners: [[-1, 1, 1], [1, 1, 1], [1, 1, -1], [-1, 1, -1]] }
  ];

  for (const face of faces) {
    addTexturedFace(positions, texcoords, shades, face.corners, face.shade);
  }

  return {
    positions: new Float32Array(positions),
    texcoords: new Float32Array(texcoords),
    shades: new Float32Array(shades)
  };
}

function addTexturedFace(positions, texcoords, shades, corners, shade) {
  const indices = [0, 1, 2, 0, 2, 3];
  const uv = [[0, 0], [1, 0], [1, 1], [0, 1]];
  for (const index of indices) {
    positions.push(corners[index][0], corners[index][1], corners[index][2]);
    texcoords.push(uv[index][0], uv[index][1]);
    shades.push(shade);
  }
}

function createCubeDetailLines() {
  const lines = [];
  const faces = ["front", "back", "left", "right", "top", "bottom"];
  for (const face of faces) {
    for (let i = -0.66; i <= 0.67; i += 0.33) {
      addFaceLine(lines, face, i, -0.92, i, 0.92);
      addFaceLine(lines, face, -0.92, i, 0.92, i);
    }

    addFaceRect(lines, face, -0.46, -0.36, 0.46, 0.36);
    addFaceRect(lines, face, -0.9, -0.86, -0.58, -0.58);
    addFaceRect(lines, face, 0.58, -0.86, 0.9, -0.58);
    addFaceRect(lines, face, -0.9, 0.58, -0.58, 0.86);
    addFaceRect(lines, face, 0.58, 0.58, 0.9, 0.86);
  }
  return lines;
}

function createCubeCircuitLines() {
  const lines = [];
  const faces = ["front", "back", "left", "right", "top", "bottom"];
  for (const face of faces) {
    addFaceLine(lines, face, -0.78, -0.12, -0.42, -0.12);
    addFaceLine(lines, face, -0.42, -0.12, -0.18, 0.2);
    addFaceLine(lines, face, -0.18, 0.2, 0.38, 0.2);
    addFaceLine(lines, face, 0.38, 0.2, 0.74, -0.28);
    addFaceLine(lines, face, -0.62, 0.56, 0.12, 0.56);
    addFaceLine(lines, face, 0.12, 0.56, 0.56, 0.02);
  }
  return lines;
}

function createCubePanelPoints() {
  const points = [];
  const faces = ["front", "back", "left", "right", "top", "bottom"];
  for (const face of faces) {
    for (let i = 0; i < 16; i += 1) {
      const a = ((i * 37) % 100) / 100;
      const b = ((i * 53) % 100) / 100;
      points.push(pointOnFace(face, -0.82 + a * 1.64, -0.82 + b * 1.64));
    }
  }
  return points;
}

function addFaceRect(lines, face, x1, y1, x2, y2) {
  addFaceLine(lines, face, x1, y1, x2, y1);
  addFaceLine(lines, face, x2, y1, x2, y2);
  addFaceLine(lines, face, x2, y2, x1, y2);
  addFaceLine(lines, face, x1, y2, x1, y1);
}

function addFaceLine(lines, face, x1, y1, x2, y2) {
  lines.push(pointOnFace(face, x1, y1), pointOnFace(face, x2, y2));
}

function pointOnFace(face, u, v) {
  const depth = 1.075;
  if (face === "front") return [u, v, depth];
  if (face === "back") return [-u, v, -depth];
  if (face === "left") return [-depth, v, u];
  if (face === "right") return [depth, v, -u];
  if (face === "top") return [u, -depth, v];
  return [u, depth, -v];
}

function getPhaseColor(phase) {
  return [
    [1, 0.54, 0.1, 0.92],
    [0.22, 0.74, 1, 0.92],
    [1, 0.75, 0.35, 0.92],
    [0.49, 0.83, 0.99, 0.9],
    [1, 0.68, 0.27, 0.92],
    [1, 1, 1, 0.92]
  ][phase % 6];
}

function ortho(left, right, bottom, top, near, far) {
  return [
    2 / (right - left), 0, 0, 0,
    0, 2 / (top - bottom), 0, 0,
    0, 0, 2 / (near - far), 0,
    (left + right) / (left - right), (bottom + top) / (bottom - top), (near + far) / (near - far), 1
  ];
}

function translate(tx, ty, tz) {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1];
}

function scale(sx, sy, sz) {
  return [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1];
}

function rotateX(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
}

function rotateY(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
}

function multiply(a, b) {
  const out = new Array(16);
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      out[col * 4 + row] =
        a[0 * 4 + row] * b[col * 4 + 0] +
        a[1 * 4 + row] * b[col * 4 + 1] +
        a[2 * 4 + row] * b[col * 4 + 2] +
        a[3 * 4 + row] * b[col * 4 + 3];
    }
  }
  return out;
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function hashRatio(seed) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function colorToCss(color) {
  const r = Math.round(clamp(color[0], 0, 1) * 255);
  const g = Math.round(clamp(color[1], 0, 1) * 255);
  const b = Math.round(clamp(color[2], 0, 1) * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function mixColor(a, b, t) {
  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t),
    lerp(a[2], b[2], t)
  ];
}

function cubicBezier(a, b, c, d, t) {
  const inv = 1 - t;
  const inv2 = inv * inv;
  const t2 = t * t;
  return {
    x: inv2 * inv * a.x + 3 * inv2 * t * b.x + 3 * inv * t2 * c.x + t2 * t * d.x,
    y: inv2 * inv * a.y + 3 * inv2 * t * b.y + 3 * inv * t2 * c.y + t2 * t * d.y
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
