import React from 'react'
import CarImage from './CarImage';
import { Auction } from '@/types';
import Link from 'next/link';
import CountdownTimer from './CountDownTimer';
import CurrentBid from './CurrentBid';

type Props = {
    auctions: Auction
}

export default function AuctionCard({auctions}: Props) {
  return (
    <Link href={`/auctions/details/${auctions.id}`} className='group'>
        <div className='w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg owerflow-hidden'>
            <div>
                <CarImage imageUrl={auctions.imageUrl} />
                <div className='absolute bottom-2 left-2'>
                    <CountdownTimer auctionEnd={auctions.auctionEnd} />
                </div>
                <div className='absolute top-2 right-2'>
                    <CurrentBid 
                        reservePrice={auctions.reservePrice} 
                        amount={auctions.currentHighBid} 
                    />
                </div>
            </div>
        </div>
        <div className='flex justify-between items-center mt-4'>
            <h3 className='text-gray-700'>{auctions.make} {auctions.model}</h3>
            <div className='font-semibold text-sm'>{auctions.year}</div>
        </div>
    </Link>
  )
}