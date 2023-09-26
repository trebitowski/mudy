import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="w-screen h-screen bg-black text-white flex justify-center items-center">
      <SignIn
        afterSignInUrl="/journal"
        afterSignUpUrl="/new-user"
        routing="path"
      />
    </main>
  )
}
