import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

async function createSubmission(req, res) {
    const session = await getSession({ req });

    // throw error if not logged in
    if (!session) {
        return res.status(401).json({ unauthorized: true });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    // // throw error if no fields committed
    if (!req.body) {
        return res.status(500).json({ error: 'validation error' });
    }

    // POST
    const post = await prisma.submission.upsert({
        where: {
            userId: user.id,
        },
        update: {
            description: req.body.description,
            submission: req.body.submission
        },
        create: {
            userId: user.id,
            description: req.body.description,
            submission: req.body.submission
        },
    });

    // close off the POST operation or throw error
    if (post.id) {
        res.status(200).json(post)
    } else {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

export default async function handler(req, res) {
    // commit
    if (req.method === 'POST') {
        return createSubmission(req, res)
    }
}