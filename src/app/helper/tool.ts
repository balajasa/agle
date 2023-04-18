export function moveWindowTop(top: number, useBehavior = true, moveElementClassName = ''){
  const el = moveElementClassName === '' ? null : document.querySelector('.' + moveElementClassName);
  if (!!el){
    moveFromElement(useBehavior, el, top);
  } else {
    moveFromWindow(useBehavior, top);
  }

}


export function moveFromElement(useBehavior: boolean, el: Element, top: number) {
  try {
    if (useBehavior) {
      el.scroll({
        top,
        left: 0,
        behavior: 'smooth'
      });
    }
    else {
      el.scroll(0, top);
    }

  }
  catch (error) {
    // IE
    el.scrollTop = top;
  }
}

export function moveFromWindow(useBehavior: boolean, top: number) {
  try {
    if (useBehavior) {
      window.scrollTo({
        top,
        left: 0,
        behavior: 'smooth'
      });
    }
    else {
      window.scrollTo(0, top);
    }

  }
  catch (error) {
    // IE
    window.scrollTo(0, top);
  }
}

export function getOffsetInWindow(el: HTMLElement) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

