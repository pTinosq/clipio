export function buildLoader() {
  /* THANK YOU TO https://loading.io */

  const loading = document.createElement("div");
  loading.classList.add("loadingSpinner");

  const ellipsis = document.createElement("div");
  ellipsis.classList.add("lds-ellipsis");

  for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    ellipsis.appendChild(div);
  }

  loading.appendChild(ellipsis);

  return loading;
}
