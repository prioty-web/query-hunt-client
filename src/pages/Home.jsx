import Banner from "./Banner";
import CompaniesWeReview from "./extra section/CompaniesWeReview";
import QueriesSection from "./extra section/QueriesSection";
import RecentQueries from "./RecentQueries";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentQueries></RecentQueries>
            <QueriesSection></QueriesSection>
            <CompaniesWeReview></CompaniesWeReview>
        </div>
    );
};

export default Home;