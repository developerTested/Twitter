import React from 'react'

export default function TweetBody({children}: { children: React.ReactNode}) {
  return (
    <div className="tweet-body text-sm mb-2">
        {children}
    </div>
  )
}
