import Wrapper from '@/components/Wrapper';
import Heading from '@/components/Heading';
import AboutText from '@/prose/about.md';
import { NextSeo } from 'next-seo';

export default function About() {
  return (
    <Wrapper>
      <NextSeo
        title="About Josh Larson"
        description="Here's some stuff about Josh Larson. I bet you're glad you found this page."
      />
      <Heading className="mb-8">So, a little bit about me...</Heading>

      <div className="prose">
        <AboutText />
      </div>
    </Wrapper>
  );
}

About.favicon = '😊';
