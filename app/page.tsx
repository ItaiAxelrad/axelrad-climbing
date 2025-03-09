import PostLink from "@/components/PostLink";
import { getPagesLocal } from "@/lib/localMd";
import {
	Badge,
	Box,
	Button,
	Card,
	CardSection,
	Center,
	Container,
	Group,
	Image,
	Text,
	Title,
} from "@mantine/core";
import { IconLocation } from "@tabler/icons-react";
import Link from "next/link";

export default async function Home() {
	const pages = await getPagesLocal("");
	const featuredPost = pages[0];

	return (
		<Container size="sm" my="xl">
			{/* <Title mb='md'>Axelrad Climbing</Title> */}
			<Box p="md">
				<Card shadow="sm" padding="xl" radius="md" withBorder>
					<CardSection>
						<Image src={featuredPost.thumbnail} alt={featuredPost.title} />
					</CardSection>

					<Group justify="space-between" mt="md">
						<Text fw="bold" fz="xl">
							{featuredPost.title}
						</Text>
						{featuredPost.location && (
							<Badge
								variant="light"
								leftSection={<IconLocation size={12} stroke={1.5} />}
							>
								{featuredPost.location}
							</Badge>
						)}
					</Group>

					<Text size="sm" c="dimmed">
						Published{" "}
						{new Date(featuredPost.publishedAt).toLocaleDateString("en-US")} by{" "}
						{featuredPost.author}
					</Text>

					<Text my="md">
						{featuredPost.content.substring(0, 160).replace(/\!\[.*\)/, "")}
						...
					</Text>

					<Button
						component={Link}
						href={`/posts/${featuredPost.dir}/${featuredPost.slug}`}
					>
						Read more
					</Button>
				</Card>
			</Box>

			<Box my="md">
				<Title order={2} mb="md">
					More Posts
				</Title>
				{pages.slice(1, 6).map((post) => (
					<PostLink key={post.order} post={post} />
				))}
				<Center>
					<Button variant="default" component={Link} href="/posts" my="xs">
						All Posts
					</Button>
				</Center>
			</Box>
		</Container>
	);
}
