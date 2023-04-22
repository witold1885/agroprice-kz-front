/* eslint-disable */
$(document).ready(function () {
  console.log('document is ready');
  const styleTags = $('style')
  console.log('styleTags:')
  console.log(styleTags)
  let css = ''
  $('style').each(function () {
    let typeAttr = $(this).attr('type')
    if (typeof typeAttr !== 'undefined' && typeAttr !== false) {
      // $(this).removeAttr('type')
      // $(this).attr('amp-custom', '')
      css += $(this).text()
      $(this).remove()
    }
  })
  // console.log(css)
  $('head').append(`<style amp-custom>${css}</style>`)
})
$(window).load(function () {
  console.log('page is loaded');
  const styleTags = $('style')
  console.log('styleTags:')
  console.log(styleTags)
})