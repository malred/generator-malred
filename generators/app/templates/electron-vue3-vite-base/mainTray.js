// 点击窗口的关闭,后台依然存在,但是托盘的关闭可以关掉后台
const { Tray, Menu } = require('electron')
const path = require('path')
function createTray(app, win) {
    // const tray = new Tray('1.png')
    const tray = new Tray(path.join(__dirname, './1.png'))
    tray.setToolTip('我的应用')
    tray.on('click', (e) => {
        // 按了shift键+click
        if (e.shiftKey) {
            // 关闭
            app.quit()
        } else {
            // 切换窗口显示隐藏
            win.isVisible() ? win.hide() : win.show()
        }
    })
    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label: '显示', click: () => {
                win.show()
            }
        },
        {
            label: '退出', click: () => {
                app.quit()
            },
        }
    ]))
}
module.exports = createTray