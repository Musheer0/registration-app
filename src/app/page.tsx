import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Users, BarChart3, Shield, Zap, CheckCircle2, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background mx-auto flex flex-col items-center">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
           <Image src={'/logo.png'} width={38} height={38} alt="logo image "/>
            <span className="text-xl font-bold">EventHub</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container px-4 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Create & Manage Events
            <span className="text-primary"> Effortlessly</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            The all-in-one platform for event organizers. Create events, manage registrations,
            track statistics, and engage with your audience—all in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/events">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage events
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed to make event management simple and efficient.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Easy Event Creation</h3>
            <p className="mt-2 text-muted-foreground">
              Create beautiful event pages in minutes with our intuitive interface. Add details,
              upload images, and set registration limits.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Registration Management</h3>
            <p className="mt-2 text-muted-foreground">
              Track all registrations in one place. View participant details, manage capacity, and
              export data easily.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Real-time Analytics</h3>
            <p className="mt-2 text-muted-foreground">
              Get insights into your events with beautiful charts and statistics. Track registration
              trends and engagement.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Secure & Reliable</h3>
            <p className="mt-2 text-muted-foreground">
              Your data is safe with us. We use industry-standard security practices to protect
              your information.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Lightning Fast</h3>
            <p className="mt-2 text-muted-foreground">
              Built for performance. Fast page loads and smooth interactions ensure the best
              experience for you and your attendees.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">User-Friendly</h3>
            <p className="mt-2 text-muted-foreground">
              Intuitive design that anyone can use. No technical knowledge required to create and
              manage professional events.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full px-4 py-24 bg-muted/50">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started in three simple steps
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-semibold">Sign Up</h3>
              <p className="mt-2 text-muted-foreground">
                Create your account with Google. It takes less than a minute.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-semibold">Create Events</h3>
              <p className="mt-2 text-muted-foreground">
                Add event details, set dates, and customize your event page.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-semibold">Manage & Track</h3>
              <p className="mt-2 text-muted-foreground">
                Monitor registrations, view statistics, and manage your events effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-24">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of event organizers who trust EventHub to manage their events.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8">
                Start Creating Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-muted/50">
        <div className="container px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-6 w-6" />
                <span className="text-xl font-bold">EventHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The all-in-one platform for event management and registration.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/events" className="hover:text-foreground">
                    Browse Events
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-foreground">
                    Create Event
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy-policy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/conditions" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
