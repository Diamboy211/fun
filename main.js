var clickss = 0

function c() {
  clickss += 1
}

function loops() {
  document.GetElementById("c").textContent = "   " + clickss;
  loops()
}

loops()
