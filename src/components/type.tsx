export interface ScheduleAdverts {
    is_paid: boolean;
    cost: number;
    is_scheduled: boolean;
    is_active: boolean;
    slot: string;
    no_of_matatus: string;
    route: string;
    advert: {
        title: string;
    };
    pricing_plan: string;
    location: string;
    matatus: string[];
    restaurants: string;
    platform: string;
    automated_scheduling: boolean;
    valid_to: string;
}


export interface Advert {
    video_price: string;
    squeezeback_price: string;
    scroll_price: string;
    popup_price: string;
    name: string;
    id: number;
    title: string;
    description: string;
    advertType: string;
    duration: number;
    type: string;
    file: File | null;
    link: string;
    created_at: string;
    is_active: string;
    is_approved: boolean
}