import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

async function createSocial(req, res) {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ unauthorized: true });
    }
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });
    console.log(req.body.twitter)
    if (!req.body.twitter) {
        return res.status(500).json({ error: 'validation error' });
    }
    const post = await prisma.social.create({
        data: {
            userId: user.id,
            twitter: req.body.twitter
        }
    })
    if (post.id) {
        res.status(200).json(post)
    } else {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

export default function handler(req, res) {
    if (req.method === 'POST') {
        return createSocial(req, res)
    }
}