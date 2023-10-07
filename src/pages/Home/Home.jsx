import TokenProvider from "../../States/TokenProvider";
import Header from "../../components/Header";
import SEO from "../../components/SEO";
import LoggedInView from "./LoggedInView";
import LoggedOutView from "./LoggedOutView";

export default function Home() {
    return (
        <>
            <SEO
                title="Secrets?!"
                description="Maybe you were searching something to keep some thoughts Secret?!"
                name="Monzurul Hasan"
                type="home_page"
            />
            <Header />
            {TokenProvider.get() ? <LoggedInView /> : <LoggedOutView />}
        </>
    );
}
