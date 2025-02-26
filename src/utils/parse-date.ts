// src/utils/parse-date.ts

export function parseRelativeDate(dateString: string): Date | string {
    const now = new Date();
    dateString = dateString.trim().toLowerCase();

    // Check for specific keywords (e.g., "刚刚", "小时前", "分钟前", "天前")
    if (dateString.includes('刚刚') || dateString.includes('just now')) {
        return now;
    }

    const hoursAgoMatch = dateString.match(/(\d+)\s*(小时|hour)s? ago/);
    if (hoursAgoMatch) {
        const hours = parseInt(hoursAgoMatch[1], 10);
        return new Date(now.getTime() - hours * 60 * 60 * 1000);
    }

    const minutesAgoMatch = dateString.match(/(\d+)\s*(分钟|minute)s? ago/);
    if (minutesAgoMatch) {
        const minutes = parseInt(minutesAgoMatch[1], 10);
        return new Date(now.getTime() - minutes * 60 * 1000);
    }

    const daysAgoMatch = dateString.match(/(\d+)\s*(天|day)s? ago/);
    if (daysAgoMatch) {
        const days = parseInt(daysAgoMatch[1], 10);
        return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    }
    
     const weeksAgoMatch = dateString.match(/(\d+)\s*(星期|week)s? ago/);
    if (weeksAgoMatch) {
        const weeks = parseInt(weeksAgoMatch[1], 10);
        return new Date(now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
    }

    if (dateString.includes('昨天') || dateString.includes('yesterday')) {
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
    
    if (dateString.includes('前天') || dateString.includes('day before yesterday')) {
        return new Date(now.getTime() - 2* 24 * 60 * 60 * 1000);
    }

    // If none of the relative formats match, return the original string.
    // The caller is responsible for handling absolute date formats.
    return dateString;
}