import { defineLoader, createContentLoader, type SiteConfig } from 'vitepress';

type CalculateReadingTimeResult = {
    minutes: number;
    labelText: string;
};

export interface ReadingTimeData {
    path: string;
    title: string;
    readingTime: CalculateReadingTimeResult;
}

export interface ReadingTimeResult {
    articles: ReadingTimeData[];
}

declare const data: ReadingTimeResult;
export { data };

/**
 * 計算文本的閱讀時間（僅顯示分鐘數）
 * @param text 要計算的文本內容
 * @param minuteFormat 時間格式模板，支援 mm(分鐘)占位符
 */
function calculateReadingTime(text: string): CalculateReadingTimeResult {
    const config: SiteConfig = (globalThis as any).VITEPRESS_CONFIG;
    const { charsPerMinute, minuteFormat } = config.userConfig.themeConfig.readingTime ?? {
        charsPerMinute: 250,
        minuteFormat: 'mm 分鐘閱讀',
    };

    // 移除HTML標籤
    const textWithoutHTML = text.replace(/<[^>]*>/g, '');

    // 移除多餘空格、換行符等
    const cleanText = textWithoutHTML.replace(/\s+/g, ' ').trim();

    // 計算字符數（不含空格）
    const charCount = cleanText.replace(/\s/g, '').length;

    // 計算閱讀時間（總秒數）
    const totalSeconds = Math.ceil((charCount / charsPerMinute) * 60);

    // 計算分鐘數（如果秒數大於30，則分鐘數加1）
    const seconds = totalSeconds % 60;
    let minutes = Math.floor(totalSeconds / 60);

    if (seconds > 30) {
        minutes += 1;
    }

    // 確保至少顯示1分鐘
    minutes = Math.max(1, minutes);

    // 替換格式中的變量
    const labelText = minuteFormat.replace(/mm/g, minutes.toString());

    return {
        minutes,
        labelText,
    };
}

export default defineLoader({
    async load(): Promise<ReadingTimeResult> {
        // 使用createContentLoader加載所有Markdown文件
        const articles = await createContentLoader('**/*.md', {
            includeSrc: true, // 需要原始Markdown內容來計算閱讀時間
            transform(data) {
                return data.map((page) => {
                    // 計算閱讀時間
                    const readingTime = calculateReadingTime(page.src || '');

                    return {
                        path: page.url,
                        title: page.frontmatter.title || '',
                        readingTime,
                    };
                });
            },
        }).load();

        return { articles };
    },
});
