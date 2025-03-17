export interface ChartsData {
    labels: string[];
    datasets: Dataset[];
}

export interface Dataset {
    label?: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
    hoverBackgroundColor?: string[];
}

export interface Color {
    color: string;
    usePointStyle?: Boolean;
}

export interface AbsOrd {
    beginAtZero?: boolean;
    ticks: Color;
    grid: Color;
}

export interface Scales {
    x: AbsOrd;
    y: AbsOrd;
}

export interface Legend {
    labels: Color;
}

export interface BasicOptions {
    scales?: Scales;
    plugins: Plugins;
    maintainAspectRatio?: Boolean;
}

export interface Plugins {
    legend: Legend;
}