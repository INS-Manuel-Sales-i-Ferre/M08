require.config({ paths: { vs: "monaco-editor/min/vs" } });
require(["vs/editor/editor.main"], function () {
  window.monaco = monaco;

  const htmlCode = document.getElementById("html-code");
  const cssCode = document.getElementById("css-code");
  const jsCode = document.getElementById("js-code");

  const htmlTab = document.getElementById("html-tab");
  const cssTab = document.getElementById("css-tab");
  const jsTab = document.getElementById("js-tab");

  const result = document.getElementById("result");

  var html_code = "";
  var css_code = "";
  var js_code = "";
  var htmlChecked = true;
  var cssChecked = false;
  var jsChecked = false;

  function saveValue(html, css, js, allFalse = true) {
    if (html) html_code = window.html_editor.getValue();
    if (css) css_code = window.html_editor.getValue();
    if (js) js_code = window.html_editor.getValue();

    if (allFalse) htmlChecked = cssChecked = jsChecked = false;
  }

  function showCheckedTab() {
    if (!window.html_editor) return;

    if (htmlTab) {
      if (htmlTab.checked) {
        saveValue(htmlChecked, cssChecked, jsChecked);
        htmlChecked = true;

        window.html_editor.setValue(html_code);
        window.monaco.editor.setModelLanguage(
          window.html_editor.getModel(),
          "html"
        );
      }
    }
    if (cssTab) {
      if (cssTab.checked) {
        saveValue(htmlChecked, cssChecked, jsChecked);
        cssChecked = true;

        window.html_editor.setValue(css_code);
        window.monaco.editor.setModelLanguage(
          window.html_editor.getModel(),
          "css"
        );
      }
    }
    if (jsTab) {
      if (jsTab.checked) {
        saveValue(htmlChecked, cssChecked, jsChecked);
        jsChecked = true;

        window.html_editor.setValue(js_code);
        window.monaco.editor.setModelLanguage(
          window.html_editor.getModel(),
          "javascript"
        );
      }
    }
  }

  function updatePreview() {
    saveValue(htmlChecked, cssChecked, jsChecked, false);
    const iframeDocument = result.contentDocument;
    iframeDocument.open();
    iframeDocument.write(`
            <html>
                <head>
                    <style>${css_code}</style>
                </head>
                <body>
                    ${html_code}
                    <script>${js_code}</script>
                </body>
            </html>
        `);
    iframeDocument.close();
  }

  // Actualizar la vista previa al cambiar el código en cualquier textarea
  // jsCode.addEventListener("input", updatePreview);

  if (htmlTab) htmlTab.addEventListener("change", showCheckedTab);
  if (cssTab) cssTab.addEventListener("change", showCheckedTab);
  if (jsTab) jsTab.addEventListener("change", showCheckedTab);

  // CREATE AN EDITOR

  var h_div = document.getElementById("code");
  window.html_editor = monaco.editor.create(h_div, {
    value: html_code,
    language: "html",
  });
  window.html_editor.onDidChangeModelContent(updatePreview);

  // Llamada inicial para renderizar el contenido inicial
  updatePreview();
  showCheckedTab();
});
