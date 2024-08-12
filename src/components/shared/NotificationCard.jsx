import React from 'react'

const NotificationCard = ({ winner }) => {
    let arr = []
    // console.log(winner?.winners)
    for (let i = 0; i < winner?.winners?.length; i++) {
        arr.push(winner?.winners[i]?.username)
    }
    const winners = arr?.join(', ')
    const userId = winner?.winners[0]?.userInfo?.discordInfo?.id
    const avatar = winner?.winners[0]?.userInfo?.discordInfo?.avatar
    const ImageUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatar}`

    return (
        <div className='flex items-start px-3 py-4 gap-x-3 w-full shadow-[0px_1px_0px_rgba(105,115,134,0.65)]'>
            {/* LEFT */}
            <div className='rounded-full h-8 w-8 min-w-[2rem] bg-[#3c393973]'>
                {userId && (
                    <>
                        {winner?.winners.length > 1 ? (
                            <span className='w-[inherit] h-[inherit] flex items-center justify-center'>
                                🎉
                            </span>
                        ) : (
                            <img
                                src={ImageUrl}
                                alt=''
                                className='w-[inherit] h-[inherit] rounded-full'
                            />
                        )}
                    </>
                )}
            </div>
            {/* RIGHT */}
            <div className='flex flex-col w-full gap-y-3'>
                <p className='text-[#FFFFFF] text-sm'>
                    {winners} is announced as winner for {winner?.nft?.name}
                </p>
                <span className='text-[#AAABAC] text-xs'>
                    {new Date(winner?.createdAt)?.toLocaleString()}
                </span>
            </div>
        </div>
    )
}

export default NotificationCard
