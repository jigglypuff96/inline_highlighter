document.addEventListener("input", function (event) {
  if (event.target.tagName.toLowerCase() === "textarea") {
    handleTextArea(event.target);
  }
});

function handleTextArea(textarea) {
  // Create overlay if it doesn't exist
  let overlay = textarea.nextElementSibling;
  if (!overlay || !overlay.classList.contains("highlight-overlay")) {
    overlay = document.createElement("div");
    overlay.className = "highlight-overlay";
    textarea.parentNode.insertBefore(overlay, textarea.nextSibling);
  }

  // Get textarea value and replace 'apple' with highlighted version
  const value = textarea.value;
  const highlightedValue = value.replace(
    /apple/gi,
    '<span class="highlight">apple</span>'
  );

  // Set the overlay content and sync styles
  overlay.innerHTML = highlightedValue.replace(/\n/g, "<br>");
  syncStyles(textarea, overlay);
}

function syncStyles(textarea, overlay) {
  const styles = window.getComputedStyle(textarea);
  const properties = [
    "font-family",
    "font-size",
    "font-weight",
    "line-height",
    "padding",
    "border",
    "box-sizing",
    "width",
    "height",
    "margin",
  ];

  properties.forEach((property) => {
    overlay.style[property] = styles[property];
  });

  // Position overlay exactly over the textarea
  overlay.style.position = "absolute";
  overlay.style.top = `${textarea.offsetTop}px`;
  overlay.style.left = `${textarea.offsetLeft}px`;
  overlay.style.pointerEvents = "none";
  overlay.style.whiteSpace = "pre-wrap";
  overlay.style.overflow = "hidden";
  overlay.style.backgroundColor = styles.backgroundColor;
  overlay.style.border = "1px solid transparent"; // Ensure the border doesn't hide the text

  // Adjust textarea styles to hide text but show cursor and caret
  textarea.style.color = "transparent";
  textarea.style.caretColor = styles.color;
  textarea.style.backgroundColor = "transparent";
}
