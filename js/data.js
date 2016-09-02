var dataService = function() {
    var aboutURI = "https://people.rit.edu/~sarics/web_proxy.php?path=about";
    var degreesURI = "https://people.rit.edu/~sarics/web_proxy.php?path=degrees";
    var minorsURI = "https://people.rit.edu/~sarics/web_proxy.php?path=minors";
    var employmentURI = "https://people.rit.edu/~sarics/web_proxy.php?path=employment";
    var peopleURI = "https://people.rit.edu/~sarics/web_proxy.php?path=people";
    var researchURI = "https://people.rit.edu/~sarics/web_proxy.php?path=research";
    var resourcesURI = "https://people.rit.edu/~sarics/web_proxy.php?path=resources";
    var newsURI = "https://people.rit.edu/~sarics/web_proxy.php?path=news";
    var footerURI = "https://people.rit.edu/~sarics/web_proxy.php?path=footer";
    var coursesURI = "https://people.rit.edu/~sarics/web_proxy.php?path=courses";
    var contactFormURI = "https://people.rit.edu/~sarics/web_proxy.php?path=contactForm";
    var mapsURI = "https://people.rit.edu/~sarics/web_proxy.php?path=map";

    function getAboutData() { return $.getJSON(aboutURI); }
    function getDegreesData() { return $.getJSON(degreesURI); }
    function getMinorsData() { return $.getJSON(minorsURI); }
    function getEmploymentData() { return $.getJSON(employmentURI); }
    function getPeopleData() { return $.getJSON(peopleURI); }
    function getResearchData() { return $.getJSON(researchURI); }
    function getResourcesData() { return $.getJSON(resourcesURI); }
    function getNewsData() { return $.getJSON(newsURI); }
    function getFooterData() { return $.getJSON(footerURI); }
    function getCoursesData() { return $.getJSON(coursesURI); }
    function getMapsData() { return $.getJSON(mapsURI); }

    return {
        getAboutData: getAboutData,
        getDegreesData: getDegreesData,
        getMinorsData: getMinorsData,
        getEmploymentData: getEmploymentData,
        getPeopleData: getPeopleData,
        getResearchData: getResearchData,
        getResourcesData: getResourcesData,
        getNewsData: getNewsData,
        getFooterData: getFooterData,
        getCoursesData: getCoursesData,
        getMapsData: getMapsData
    };
};
