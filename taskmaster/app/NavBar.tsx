'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { PiNotepadBold } from "react-icons/pi";
import classnames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        {label: 'Home', href: '/'},
        {label: 'Add Tasks', href: '/tasks/new'},
        {label: 'All Tasks', href: '/tasks/all'},
        {label: 'Incomplete Tasks', href: '/tasks/incomplete'},
        {label: 'Completed Tasks', href: '/tasks/completed'},
    ]
  return (
    <nav className="mr-6 ml-6 flex space-x-6  border-b-2  border-yellow-800 mb-0 px-5 h-14 items-center text-yellow-900">
        <Link href="/"><PiNotepadBold  /></Link>
        <ul className='flex space-x-6'>
            {links.map(link => <Link  
            key={link.href} 
            className={classnames({
                'text-yellow-900': link.href === currentPath,
                'text-yellow-700':link.href !== currentPath,
                'hover:text-yellow-800 transition-colors':true
            })} 
            href={link.href}>{link.label}</Link>)}
        </ul>
    </nav>
  )
}

export default NavBar;