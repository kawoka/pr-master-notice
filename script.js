function renderView (baseBranch, headBranch) {
  const tagStyle = `
    padding: 3px 5px;
    display: inline-block;
    background: #def;
    border-radius: 4px;
    letter-spacing: 1px;
  `

  const masterStyle = `
    font-size: 30px;
    color: #FFF;
    background: #db1f36;
    padding: 3px 10px;
  `

  const baseStyle = baseBranch === 'master' ? masterStyle : ''
  const template   = document.createElement('div')
  template.innerHTML = `
    <div style="text-align: center; margin: 20px 0">
      <strong style="${tagStyle} ${baseStyle}">${baseBranch}</strong>
      <i>←</i>
      <span style="${tagStyle}">${headBranch}</span>
    </div>
  `
  return template
}

function render(){
  const baseDOM  = document.querySelector('.base-ref')
  const headDOM  = document.querySelector('.head-ref')
  const mergeDOM = document.querySelector('.merge-pr')

  if(!baseDOM)  return // console.error('cant find baseDOM')
  if(!headDOM)  return // console.error('cant find headDOM')
  if(!mergeDOM) return // console.error('cant find mergeButtonDOM')

  const baseBranch = baseDOM.innerText
  const headBranch = headDOM.innerText

  const view = renderView(baseBranch, headBranch)
  mergeDOM.insertBefore(view, mergeDOM.firstChild)
}

function main() {
  const observer = new MutationObserver(render)
  const body  = document.querySelector('body')
  const config = { attributes: true, childList: true, characterData: true };
  observer.observe(body,config)
  render()
}
main()

