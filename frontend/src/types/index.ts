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
    name: string,
    displayName?: string,
    avatar?: string,
    verified? : boolean,
    post?: number,
    followers?: number,
    following?: number,
    about?: string,
    location?: string,
    mobile_number?: number,
}


export type TweetType = {
    id: number,
    content: string,
    images: object[] | string[],
    user: UserType,
    stats: StatsType,
}

export type PostCommentType = {
    user: UserType,
    content: string,
}

export type PostType = {
    id: number,
    content: string,
    likes: number,
    user: UserType,
    comments?: PostCommentType[],
    createdAt: Date,
    updatedAt: Date,
}

export type StatsType = {
    retweets: number,
    likes: number,
    views: number,
}

export type WhoToFollowType = {
    items: UserType[],
}