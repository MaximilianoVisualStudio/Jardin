const PETAL_COLORS = ['#ff6b6b', '#f9ca24', '#e056fd', '#48dbfb', '#ff9ff3', '#feca57', '#7ed957'];
const CENTER_COLORS = ['#f9ca24', '#fffa65', '#333333'];
const STEM_COLOR = '#6ab04c';

/**
 * Generates a random number within a specified range.
 */
function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Creates SVG for ellipse-shaped petals.
 */
function createEllipsePetals(numPetals: number, petalLength: number, petalWidth: number, centerSize: number): string {
  let petalsSvg = '';
  const angleStep = 360 / numPetals;
  for (let i = 0; i < numPetals; i++) {
    const angle = i * angleStep;
    petalsSvg += `<ellipse cx="0" cy="${-(petalLength / 2 + centerSize / 2)}" rx="${petalWidth / 2}" ry="${petalLength / 2}" transform="rotate(${angle})"/>`;
  }
  return petalsSvg;
}

/**
 * Creates SVG for path-based, pointed petals.
 */
function createPointedPetals(numPetals: number, petalLength: number, petalWidth: number, centerSize: number): string {
    let petalsSvg = '';
    const angleStep = 360 / numPetals;
    for (let i = 0; i < numPetals; i++) {
        const angle = i * angleStep;
        const startY = -(centerSize / 2);
        const endY = -(centerSize / 2 + petalLength);
        const controlX = petalWidth;
        // Using a quadratic bezier curve for a pointed petal shape
        petalsSvg += `<path d="M0,${startY} Q${controlX},${startY + (endY - startY) / 2} 0,${endY} Q${-controlX},${startY + (endY - startY) / 2} 0,${startY} Z" transform="rotate(${angle})"/>`;
    }
    return petalsSvg;
}

const petalFunctions = [createEllipsePetals, createPointedPetals];

/**
 * Generates all data needed for a flower, including SVG, color, and size.
 */
export function generateFlowerData() {
  const petalColor = PETAL_COLORS[Math.floor(random(0, PETAL_COLORS.length))];
  const centerColor = CENTER_COLORS[Math.floor(random(0, CENTER_COLORS.length))];
  const size = random(80, 160); // size in pixels

  const numPetals = Math.floor(random(5, 12));
  const petalLength = size * random(0.25, 0.4);
  const petalWidth = size * random(0.1, 0.22);
  const centerSize = size * random(0.1, 0.2);
  const stemHeight = size * random(0.4, 0.6);
  const stemSway = size * random(-0.15, 0.15);
  const stemWidth = size * random(0.02, 0.04);
  const petalColorOpacity = random(0.7, 1.0);
  
  const selectedPetalFunc = petalFunctions[Math.floor(random(0, petalFunctions.length))];
  const petalsSvg = selectedPetalFunc(numPetals, petalLength, petalWidth, centerSize);

  const viewBoxSize = size;
  const viewboxCenter = viewBoxSize / 2;
  
  const svgContent = `
    <g transform="translate(${viewboxCenter}, ${viewboxCenter * 0.8})" style="transform-origin: center bottom;">
      <g fill="${petalColor}" opacity="${petalColorOpacity}">
        ${petalsSvg}
      </g>
      <circle cx="0" cy="0" r="${centerSize / 2}" fill="${centerColor}" />
    </g>
    <path 
      d="M${viewboxCenter} ${viewBoxSize} Q${viewboxCenter + stemSway} ${viewBoxSize - stemHeight / 2} ${viewboxCenter} ${viewBoxSize - stemHeight}" 
      stroke="${STEM_COLOR}" 
      stroke-width="${stemWidth}" 
      fill="none" 
      stroke-linecap="round"
    />
  `;

  const svg = `<svg 
    width="100%" 
    height="100%" 
    viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" 
    preserveAspectRatio="xMidYMid meet" 
    xmlns="http://www.w3.org/2000/svg"
    style="overflow: visible;"
  >
    ${svgContent}
  </svg>`;

  return { svg, color: petalColor, size };
}