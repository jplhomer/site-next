import { mergeClasses } from '@/lib/utils';
import Head from 'next/head';
import { Children } from 'react';

export default function Resume() {
  return (
    <Page>
      <Header />
      <SectionTitle>Experience</SectionTitle>
      <Job company="Vox Media" location="Remote" url="https://voxmedia.com" dateRange="March 2016 - present">
        <Position title="Lead Engineer 2" dateRange="July 2019 - present">
          Plan, build and scale architecture of internal and external{' '}
          <a className="underline" href="https://concert.io">
            Concert
          </a>{' '}
          premium advertising network products. Leverage serverless technologies to roll out real-time bidding services
          (Cloud Run, Node.js) and lead the development of a self-service advertising application (React, Next.js,
          Rails, GraphQL). Maintain and improve other Concert products for targeting, classifying and delivering
          advertisements in an ethical, efficient and user-friendly way. Spearhead the roll-out of modern CI, CD and
          DevOps tools within the revenue engineering team.
        </Position>
        <Position title="Senior Engineer" dateRange="Jan 2018 - July 2019">
          Develop front-end system architecture for internal and public-facing applications. Work closely with and
          mentor team members to create the next generation of quality advertising products. (Rails, Backbone, ES2015,
          Vue)
        </Position>
        <Position title="Front End Engineer" dateRange="March 2016 - Jan 2018">
          Build revenue-focused applications for display advertisements and branded content. Help launch unified
          homepages across all brands. Refactor JavaScript architecture for advertising platforms. Build integrations
          with third-party advertisers.
        </Position>
      </Job>
      <Job company="Barkpass" location="Des Moines, IA" url="https://www.barkpass.com" dateRange="April 2019 - present">
        <Position title="Co-Founder">
          Create a SaaS platform for cities and organizations to manage dog park registrations and pet licenses. Guide
          product definition and iteration, customer service, and maintenance. Design and develop the customer- and
          administrator-facing application APIs and user interface. (Laravel, Next.js)
        </Position>
      </Job>
      <Job
        company="Happy Medium"
        location="Des Moines, IA"
        url="https://itsahappymedium.com"
        dateRange="July 2012 – March 2016"
      >
        <Position title="Lead Developer" dateRange="August 2014 - March 2016">
          Manage a team of developers on an early-stage, fast-growth startup. Establish processes for version control,
          front-end patterns and back-end practices. Mentor team, encourage speaking engagements, and promote continued
          learning. Implement company DevOps (Linux, nginx, Apache). Build a SaaS digital signage product from the
          ground up (Meteor, MongoDB, NodeJS). Develop a product vision and guide stakeholders through development
          roadmap.
        </Position>
        <Position title="Web Developer" dateRange="July 2012 - August 2014">
          Integrate web development into company’s core services. Build responsive, user-friendly websites using
          primarily WordPress (PHP, MySQL, AngularJS, JavaScript). Implement pattern-based front-end approach (BEM,
          Sass, Pattern Lab, Grunt).
        </Position>
      </Job>

      <SectionTitle>Leadership &amp; Community Involvement</SectionTitle>

      <GenericEntry dateRange="October 2013 – present">
        <EntryTitle>Des Moines Web Geeks</EntryTitle>
        <GenericMeta>Co-Organizer, Speaker</GenericMeta>
      </GenericEntry>

      <GenericEntry dateRange="June 2018 – present">
        <EntryTitle>Waukee Lions Club</EntryTitle>
        <GenericMeta>Co-Founder, Treasurer</GenericMeta>
      </GenericEntry>

      <SectionTitle>Education</SectionTitle>

      <GenericEntry dateRange="August 2007 – May 2011">
        <EntryTitle>Iowa State University</EntryTitle>
        <GenericMeta>
          <strong>B.S.</strong>, Journalism & Mass Communications [Electronic Media], <strong>B.A.</strong>, Hispanic
          Studies
        </GenericMeta>
      </GenericEntry>
    </Page>
  );
}

Resume.noLayout = true;

function Page({ children }) {
  return (
    <div className="wrapper bg-gray-800 min-h-screen p-8">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className="bg-white p-6 mx-auto body"
        style={{
          width: '8.5in',
          height: '11in',
          fontFamily: 'Source Serif Pro, serif',
        }}
      >
        {children}
      </div>
      <style jsx>{`
        @media print {
          .wrapper {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
        @page {
          margin: 10px;
        }
      `}</style>
    </div>
  );
}

function Header() {
  return (
    <header className="flex justify-between items-center mb-1">
      <h1 className="font-bold text-4xl">Josh Larson</h1>
      <div className="text-right text-gray-500">
        <div className="font-bold italic">Software Engineer - Des Moines, IA</div>
        <div className="text-sm">
          <a href="https://jplhomer.org">jplhomer.org</a> - <a href="mailto:jplhomer@gmail.com">jplhomer@gmail.com</a> -{' '}
          <a href="https://twitter.com/jplhomer">@jplhomer</a>
        </div>
      </div>
    </header>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-gray-600 italic text-xl font-semibold border-b-2 border-gray-300 mb-3 mt-1">{children}</h2>
  );
}

function EntryTitle({ children }) {
  return <h3 className="font-bold text-lg leading-none">{children}</h3>;
}

function Job({ company, location, url, dateRange, children }) {
  return (
    <>
      <Grid className="mb-1">
        <EntryTitle>{company}</EntryTitle>
        <div className="flex justify-between italic text-sm">
          <span>
            {location} - <a href={url}>{url}</a>
          </span>
          <DateRange>{dateRange}</DateRange>
        </div>
      </Grid>
      {children}
    </>
  );
}

function Position({ title, dateRange, children }) {
  return (
    <Grid className="mb-2">
      <div className="text-sm italic">
        <div>{title}</div>
        <div>{dateRange}</div>
      </div>
      <div className="text-sm">{children}</div>
    </Grid>
  );
}

function Grid({ children, className }) {
  const [left, right] = Children.toArray(children);

  return (
    <div className={mergeClasses('grid grid-cols-4 gap-2 max-w-full', className)}>
      <div>{left}</div>
      <div className="col-span-3">{right}</div>
    </div>
  );
}

function GenericEntry({ children, dateRange }) {
  return (
    <div className="flex justify-between mb-2">
      <div>{children}</div>
      <DateRange>{dateRange}</DateRange>
    </div>
  );
}

function GenericMeta({ children }) {
  return <div className="italic text-sm">{children}</div>;
}

function DateRange({ children }) {
  return <div className="italic font-semibold text-sm">{children}</div>;
}
