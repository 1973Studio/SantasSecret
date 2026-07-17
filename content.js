/*
 * Santa's Secret — content layer.
 * --------------------------------------------------------------------------
 * The site's DESIGN lives in code (HTML/CSS). Its editable COPY lives in
 * content.json. On load, this script fills every element marked with
 * data-edit="path" from that file — so the words can be changed (via the
 * oo.studio dashboard) without ever touching the layout or structure.
 *
 * Content is also baked into the HTML as the default, so search engines and
 * a no-JS visitor still see everything; this just applies any edits on top.
 * Text only (never innerHTML), so an edit can never inject markup.
 * ========================================================================== */
(function () {
  'use strict'

  function getPath(obj, path) {
    return path.split('.').reduce(function (o, k) {
      return (o && o[k] != null) ? o[k] : null
    }, obj)
  }

  function apply(data) {
    if (!data) return
    document.querySelectorAll('[data-edit]').forEach(function (el) {
      var val = getPath(data, el.getAttribute('data-edit'))
      if (typeof val === 'string') el.textContent = val
    })
  }

  fetch('content.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null })
    .then(apply)
    .catch(function () { /* keep the baked-in copy if content.json is missing */ })
})()
