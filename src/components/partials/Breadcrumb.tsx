import { GoHome } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useLocation } from "react-router";

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (
        <div>
            <div className="px-4">
                <div className="text-[#999999] flex items-center lg:px-0 py-6 md:py-12 gap-1">
                    <Link to="/">
                        <GoHome />
                    </Link>

                    {pathnames.length > 0 && <MdKeyboardArrowRight />}

                    {/* Generate dynamic links */}
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames
                            .slice(0, index + 1)
                            .join("/")}`;
                        const isLast = index === pathnames.length - 1;

                        return (
                            <div
                                key={index}
                                className="flex items-center gap-1 md:gap-3"
                            >
                                <Link
                                    to={routeTo}
                                    className={
                                        isLast
                                            ? "text-primary cursor-pointer text-xs sm:text-sm"
                                            : ""
                                    }
                                >
                                    {name.charAt(0).toUpperCase() +
                                        name.slice(1)}
                                </Link>
                                {!isLast && <MdKeyboardArrowRight />}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
