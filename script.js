(function Accordion() {
  const triggers = document.querySelectorAll('[data-toggle="collapse"]');
  let activeToggle;

  triggers &&
  triggers.forEach(trigger => {
    trigger.collapseTarget = document.querySelector(
    trigger.hash || trigger.dataset.target);


    trigger.collapseTarget.dataset.parent &&
    trigger.collapseTarget.classList.contains("is-active") && (
    activeToggle = trigger);

    trigger.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      toggle(trigger);
    });

    // Remove height when end open transition
    trigger.collapseTarget.addEventListener("transitionend", ({ target }) => {
      if (!target.classList.contains("is-active")) return;

      target.style.height = null;
    });
  });

  function toggle(trigger) {
    if (trigger.collapseTarget.classList.contains("is-active")) {
      close(trigger);
      activeToggle = null;
    } else {
      activeToggle &&
      activeToggle.collapseTarget.dataset.parent &&
      close(activeToggle);

      trigger.collapseTarget.dataset.parent && (activeToggle = trigger);

      open(trigger);
    }
  }

  function close(trigger) {
    setHeight(trigger.collapseTarget);

    trigger.parentElement.classList.remove("is-active");
    trigger.classList.remove("is-active");
    trigger.collapseTarget.classList.remove("is-active");

    setTimeout(() => {
      trigger.collapseTarget.style.height = null;
    }, 0);
  }

  function open(trigger) {
    trigger.classList.add("is-active");
    trigger.parentElement.classList.add("is-active");

    setTimeout(() => {
      setHeight(trigger.collapseTarget);
      trigger.collapseTarget.classList.add("is-active");
    }, 0);
  }

  function setHeight(target) {
    target.style.height = target.scrollHeight + "px";
  }
})();