var clickss = 0

function c() {
  clickss += 1
}

function loops() {
  document.GetElementById("c").textContent = "   " + clickss;
}

setInterval(loops, 50)
