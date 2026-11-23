import Link from 'next/link';

const features = [
    {
        title: 'Private notes',
        text: 'Only you can see your notes. Create, edit and delete them anytime.',
    },
    {
        title: 'Categories',
        text: 'Group your notes by subject to find everything faster.',
    },
    {
        title: 'Movie search',
        text: 'Take a break and look up any movie right from your dashboard.',
    },
];

export default function Home() {
    return (
        <div className="py-12 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Made for students
                </span>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
                    Your study notes,
                    <br />
                    <span className="text-blue-600">all in one place.</span>
                </h1>
                <p className="mt-6 text-slate-500">
                    Study Hub helps you save, organize and find your notes from
                    any device.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href="/register" className="btn-primary px-6 py-3">
                        Create free account
                    </Link>
                    <Link href="/login" className="btn-outline px-6 py-3">
                        I already have an account
                    </Link>
                </div>
            </div>

            <div className="mt-20 grid gap-4 sm:grid-cols-3">
                {features.map((feature) => (
                    <div key={feature.title} className="card">
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="mt-2 text-sm text-slate-500">
                            {feature.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
