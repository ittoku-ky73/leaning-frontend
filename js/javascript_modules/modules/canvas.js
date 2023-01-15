// canvasをparentに追加
function create(id, parent, width, height) {
  const wrapper = document.createElement("div");
  const canvas = document.createElement("canvas") ;
  const ctx = canvas.getContext("2d");

  wrapper.id = id;
  canvas.width = width;
  canvas.height = height;

  wrapper.appendChild(canvas);
  parent.appendChild(wrapper);

  return {
    ctx: ctx,
    id: id,
  };
}

// リストをwrapperIdの要素に追加
function createReportList(wrapperId) {
  const wrapper = document.getElementById(wrapperId);
  const list = document.createElement("ul");

  list.id = wrapperId + "-reporter";
  wrapper.appendChild(list);

  return list.id;
}

export { create, createReportList };
