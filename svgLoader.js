function loadSvgIcons(directory) {
  document.querySelectorAll(".icon").forEach(async (el) => {
    for (const cls of el.classList) {
      if (cls.startsWith("icon-") && cls !== "icon") {
        const iconName = cls.replace("icon-", "");
        const url = `${directory}/${iconName}.svg`;

        try {
          const res = await fetch(url);
          if (!res.ok) continue;

          const svgText = await res.text();
          const temp = document.createElement("div");
          temp.innerHTML = svgText.trim();
          const svg = temp.querySelector("svg");
          if (!svg) continue;

          svg.classList.add(...el.classList);

          el.replaceWith(svg);
          break; 
        } catch (err) {
          console.error(`Error loading icon '${iconName}':`, err);
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const script = document.currentScript || document.querySelector('script[src="svgLoader.js"]');
  console.log(script);
  const path = script.getAttribute("data-path") || "./images";
  console.log(`Loading SVG icons from: ${path}`);
  loadSvgIcons(path);
});