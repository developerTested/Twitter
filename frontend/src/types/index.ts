export type ApiError = Error & {
    success: boolean,
    statusCode: number,
    message: string,
    data: null,
    errors: any[],
    stack?: string,
}

export type loginType = {
    email: string,
    password: string
}

export type registerType = {
    username: string,
    fullName: string,
    email: string,
    password: string,
}

export type UserType = {
    id: number,
    user_name: string,
    display_name?: string,
    avatar?: string,
    verified?: boolean,
    tweets?: number,
    followers?: number,
    following?: number,
    about?: string,
    location?: string,
    mobile_number?: number,
}


export type TweetType = {
    id: number,
    content: string,
    images?: object[] | string[],
    user: UserType,
    stats?: StatsType,
}

export type StatsType = {
    retweets: number,
    likes: number,
    views: number,
}

export type WhoToFollowType = {
    items: UserType[],
}