const { chromium } = require('playwright');
const path = require('path');

async function takeScreenshot(url, filename) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.screenshot({
        path: path.join(__dirname, 'screenshots', filename),
        fullPage: false
    });
    await browser.close();
    console.log(`Screenshot saved: ${filename}`);
}

async function main() {
    const baseUrl = 'https://prototypes-ivory-nine.vercel.app';
    const pages = [
        ['/pc/新盘管理/新盘管理-列表-PC.html', '01-pc-new-building.png'],
        ['/pc/探盘任务/探盘任务-列表.html', '02-pc-task-list.png'],
        ['/pc/录音分析/录音分析-列表.html', '03-pc-record-list.png'],
        ['/pc/物料生成管理/物料生成管理-列表-PC.html', '04-pc-material.png'],
        ['/pc/数据看板/数据看板-总览-PC.html', '05-pc-dashboard.png'],
        ['/pc/客户管理/客户管理-列表.html', '06-pc-customer.png'],
        ['/wxapp/home/首页-AI助手.html', '07-wxapp-home.png'],
        ['/wxapp/录音分析/录音分析-列表.html', '08-wxapp-record.png'],
        ['/wxapp/客户/客户列表.html', '09-wxapp-customer.png'],
    ];

    for (const [path, filename] of pages) {
        try {
            await takeScreenshot(baseUrl + path, filename);
        } catch (e) {
            console.error(`Failed to screenshot ${path}: ${e.message}`);
        }
    }
}

main();
