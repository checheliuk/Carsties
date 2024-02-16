import Image from 'next/image'
import React from 'react'
import CountDownTimer from './CountDownTimer';

type Props = {
    auctions: any
}

export default function AuctionCard({auctions}: Props) {
  return (
    <a href="#">
        <div className='w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg owerflow-hidden'>
            <div>
                <Image 
                    src={auctions.imageUrl}
                    alt='image'
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                    priority
                />
                <div className='absolute bottom-2 left-2'>
                    <CountDownTimer auctionEnd={auctions.auctionEnd} />
                </div>
            </div>
        </div>
        <div className='flex justify-between items-center mt-4'>
            <h3 className='text-gray-700'>{auctions.make} {auctions.model}</h3>
            <div className='font-semibold text-sm'>{auctions.year}</div>
        </div>
    </a>
  )
}