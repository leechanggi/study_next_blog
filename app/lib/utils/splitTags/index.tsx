const splitTags = (tags: string | null): string[] => {
	return tags ? tags.split(',').map(tag => tag.trim()) : [];
};

export default splitTags;
