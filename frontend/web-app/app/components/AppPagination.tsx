'use client'

import React, { useState } from 'react'
import { Pagination } from 'flowbite-react'

type Props = {
    currentPage: number
    pageCount: number
    pagaChanged: (page: number) => void;
}

export default function AppPagination({currentPage, pageCount, pagaChanged}: Props) {

    return (
        <Pagination 
            currentPage={currentPage}
            onPageChange={e => pagaChanged(e)}
            totalPages={pageCount}
            layout='pagination'
            showIcons={true}
            className='text-blue-500 mb-5'
        />
    )
}
