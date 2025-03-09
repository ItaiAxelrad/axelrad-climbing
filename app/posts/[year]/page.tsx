import PostLink from "@/components/PostLink";
import { getPagesLocal } from "@/lib/localMd";
import { Container, Title } from "@mantine/core";

type Params = Promise<{ year: string }>;

export default async function Posts({ params }: { params: Params }) {
	const { year } = await params;
	const posts = await getPagesLocal(year);

	return (
		<Container size="sm" my="xl">
			<Title mb="md">Posts from {year}</Title>
			{posts.map((post) => (
				<PostLink key={post.order} post={post} />
			))}
		</Container>
	);
}
