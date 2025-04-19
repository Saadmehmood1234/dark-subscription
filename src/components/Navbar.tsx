// components/Navbar.tsx
'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Home, ShoppingCart, User } from 'lucide-react'
import SignOutButton from './SignOutButton'
import MobileMenuAfterSignIn from './MobileMenuAfterSignIn'
import MobileMenu from './MobileMenu'
import CartIcon from './CartIcon'
import SearchInput from './SearchInput'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (status === 'loading' || !mounted) {
    return (
      <nav className="fixed w-full top-0 left-0 z-50 bg-[#1F133D] shadow-lg">
        <div className="flex items-center justify-between px-6 py-3">
          <Link href="/">
            <div className="text-2xl font-bold cursor-pointer">
              <h1 className="text-[#C27AFF] text-3xl">
                Prime<span className="text-white">Flix</span>
              </h1>
            </div>
          </Link>
          <div className="animate-pulse bg-gray-700 rounded h-10 w-64"></div>
          <div className="hidden md:flex items-center gap-6">
            <div className="animate-pulse bg-gray-700 rounded h-10 w-24"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-[#1F133D] shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        <Link href="/">
          <div className="text-2xl font-bold cursor-pointer">
            <h1 className="text-[#C27AFF] text-3xl">
              Prime<span className="text-white">Flix</span>
            </h1>
          </div>
        </Link>

        <SearchInput />

        <div className="hidden md:flex items-center gap-6">
          {session ? (
            <>
              <Link href="/profile">
                <img
                  src={session.user?.image || '/default-profile.png'}
                  className="w-12 h-12 rounded-full"
                  alt="Profile"
                />
              </Link>
              <CartIcon />
              <SignOutButton />
            </>
          ) : (
            <Link href="/auth/signin">
              <button className="text-white font-bold bg-[#A92EDF] hover:bg-[#8e5ea3] px-5 py-2 rounded-lg cursor-pointer transition-all">
                Sign In
              </button>
            </Link>
          )}
        </div>
        {session ? <MobileMenuAfterSignIn /> : <MobileMenu />}
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1F133D] text-white p-4 shadow-lg flex justify-around">
        <Link href="/" className="flex flex-col items-center">
          <Home className="text-[#C27AFF]" size={24} />
          <span>Home</span>
        </Link>
        <Link
          href={session ? "/account" : "/auth/signin"}
          className="flex flex-col items-center"
        >
          <User className="text-[#C27AFF]" size={24} />
          <span>{session ? "Account" : "Sign In"}</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar