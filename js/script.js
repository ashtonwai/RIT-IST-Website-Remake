$(document).ready(function() {
    /* Display Data */
    // About Data
    dataService().getAboutData()
        .done(function(aboutData) {
            $('#about-title').text(aboutData.title);
            $('#about-desc').text(aboutData.description);
            $('#quote').text(aboutData.quote);
            $('#quote-author').text("- " + aboutData.quoteAuthor);
        }); // end getAboutData

    // Degrees Data
    dataService().getDegreesData()
        .done(function(degreesData) {
            // Undergraduate
            var undergraduate = degreesData.undergraduate;
            for (var i = 0; i < undergraduate.length; i ++) {
                // set icon
                var icon = setIcon(undergraduate[i].degreeName);
                // undergraduate concentrations
                var concentrations = undergraduate[i].concentrations;
                var cons = "";
                for (var k = 0; k < concentrations.length; k ++) {
                    cons += '<small>' + concentrations[k] + ' | </small>';
                }
                // append degrees
                var degree = '<div class="degree-box"><div class="degree-info"><div class="degree-icon">' + icon + '</div><h4>' + undergraduate[i].title + '</h4><p>' + undergraduate[i].description + '</p></div><div class="degree-concentrations"><h5>Concentrations</h5>' + cons + '</div></div>';
                $('#under-degrees').append(degree);
            }

            // Graduate
            var graduate = degreesData.graduate;
            for (var q = 0; q < graduate.length - 1; q ++) {
                // set icon
                var gIcon = setIcon(graduate[q].degreeName);
                // graduate concentrations
                var gConcentrations = graduate[q].concentrations;
                var gCons = "";
                for (var p = 0; p < gConcentrations.length; p ++) {
                    gCons += '<small>' + gConcentrations[p] + ' | </small>';
                }
                // append degrees
                var gDegree = '<div class="degree-box"><div class="degree-info"><div class="degree-icon">' + gIcon + '</div><h4>' + graduate[q].title + '</h4><p>' + graduate[q].description + '</p></div><div class="degree-concentrations"><h5>Concentrations</h5>' + gCons + '</div></div>';
                $('#grad-degrees').append(gDegree);
            }
        }); // end getDegreesData

    // Minors Data
    dataService().getMinorsData()
        .done(function(minorsData) {
            for (var i = 0; i < minorsData.length; i ++) {
                // set icon
                var icon = setIcon(minorsData[i].name);
                // append minor
                var minor = '<div class="minor-box" name="' + minorsData[i].name + '" data-toggle="modal" data-target="#minorModal"><div class="minor-icon">' + icon + '</div><div class="minor-info"><h4>' + minorsData[i].title + '</h4></div></div>';
                $('#minors-container').append(minor);
            }
        }); // end getMinorsData

    // Employment Data
    dataService().getEmploymentData()
        .done(function(employData) {
            // title
            $('#employ-title').text(employData.introduction.title);
            // statistics
            var stats = employData.degreeStatistics.statistics;
            for (var i = 0; i < stats.length; i ++) {
                var stat = '<div><h2>' + stats[i].value + '</h2><p>' + stats[i].description + '</p></div>';
                $('#employ-stats').append(stat);
                if (i < stats.length - 1) {
                    $('#employ-stats').append('<hr />');
                }
            }

            // professional contents
            var contents = employData.introduction.content;
            var pro = '<h4>' + contents[0].title + '</h4><p>' + contents[0].description + '</p><hr /><button class="btn btn-primary btn-lg" name="employmentTable" data-toggle="modal" data-target="#employModal">Professional Employment<br />Table</button>';
            $('#employ-pro').append(pro);
            // co-op contents
            var coop = '<h4>' + contents[1].title + '</h4><p>' + contents[1].description + '</p><hr /><button class="btn btn-primary btn-lg" name="coopTable" data-toggle="modal" data-target="#employModal">Co-op Table</button>';
            $('#employ-coop').append(coop);

            // employers
            var employers = employData.employers;
            var employDiv = $('<div></div>');
            employDiv.append($('<h4></h4>').text(employers.title));
            $.each(employers.employerNames, function(index, employer) {
                employDiv.append($('<p></p>').text(employer));
            });
            $('#employ-company').append(employDiv);
            $('#employ-company').append('<hr />');
            // careers
            var careers = employData.careers;
            var careerDiv = $('<div></div>');
            careerDiv .append($('<h4></h4>').text(careers.title));
            $.each(careers.careerNames, function(index, career) {
                careerDiv.append($('<p></p>').text(career));
            });
            $('#employ-company').append(careerDiv);
        }); // end getEmploymentData

    // People Data
    dataService().getPeopleData()
        .done(function(peopleData) {
            // set title
            $('#people-title').text(peopleData.title);
            $('#people-sub').text(peopleData.subTitle);
            // show faculties
            showPeopleImage(peopleData.faculty, $('#people-faculty'));
            // show staffs
            showPeopleImage(peopleData.staff, $('#people-staff'));
        }); // end getPeopleData

    // Research Data
    dataService().getResearchData()
        .done(function(researchData) {
            // by interest area
            var interests = researchData.byInterestArea;
            $.each(interests, function(index, interest) {
                var icon = setIcon(interest.areaName);
                var areaIcon = $('<div></div>')
                                .addClass('area-icon')
                                .append(icon);
                var areaName = $('<div></div>')
                                .addClass('area-name')
                                .append($('<h4></h4>').text(interest.areaName));
                var area = $('<div></div>')
                                .addClass('area')
                                .attr('name', interest.areaName)
                                .attr('data-toggle', 'modal')
                                .attr('data-target', '#researchModal')
                                .append(areaIcon)
                                .append(areaName);
                $('#research-interest').append(area);
            });

            // by faculty
            var faculties = researchData.byFaculty;
            $.each(faculties, function(index, faculty) {
                var prof = $('<div></div>')
                                .addClass('professor')
                                .attr('name', faculty.facultyName)
                                .attr('data-toggle', 'modal')
                                .attr('data-target', '#researchModal')
                                .append($('<h4></h4>').text(faculty.facultyName));
                $('#research-faculty').append(prof);
            });
        }); // end getResearchData

    // Resources Data
    dataService().getResourcesData()
        .done(function(resourcesData) {
            $('#resource-title').text(resourcesData.title);
            $('#resource-sub').text(resourcesData.subTitle);
            $.each(resourcesData, function(key, obj) {
                if (key != "title" && key != "subTitle") {
                    var title = (obj.title) ? obj.title : "Forms";
                    var tag = $('<div></div>')
                                    .addClass('resource-tag')
                                    .append($('<h4></h4>').text(title));
                    var link = $('<a></a>')
                                    .attr('href', '#res-' + key)
                                    .attr('aria-controls', 'res-' + key)
                                    .attr('role', 'tab')
                                    .attr('data-toggle', 'tab');
                    var resource = $('<div></div>')
                                        .addClass('resource')
                                        .attr('id', 'tab-' + key)
                                        .append(tag)
                                        .append(link);
                    if (key == "studyAbroad") {
                        resource.addClass('active');
                    }
                    $('#resources').append(resource);

                    appendResourceDetail(key, obj, title);

                    resource.click(function(e) {
                        e.preventDefault();
                        $('.resource').each(function() {
                            $(this).removeClass('active');
                        });
                        $(this).addClass('active');
                        link.tab('show');
                    });
                }
            });
        }); // end getResourcesData

    // Footer Data
    dataService().getFooterData()
        .done(function(footerData) {
            $('#facebook-link').attr('href', footerData.social.facebook);
            $('#twitter-link').attr('href', footerData.social.twitter);
            $('#copyright').append(footerData.copyright.html);
            $.each(footerData.quickLinks, function(index, link) {
                var a = $('<a></a>').attr('href', link.href)
                                    .text(link.title);
                $('#links').append($('<li></li>').append(a));
            });
        }); // end getFooterData

    // News Data
    dataService().getNewsData()
        .done(function(newsData) {
            $.each(newsData, function(key, item) {
                var a = $('<a></a>').text(key)
                                    .attr('href', '#')
                                    .attr('name', key)
                                    .attr('data-toggle', 'modal')
                                    .attr('data-target', '#newsModal');
                $('#news').append($('<li></li>').append(a));
            });
        });

    /* Minor Modal */
    $('#minorModal').on('show.bs.modal', function(e) {
        var minorName = e.relatedTarget.getAttribute('name');
        showMinorDetail(minorName);
    });
    $('#minorModal').on('hidden.bs.modal', function() {
        $('#minorModalCourses').empty();
    });

    /* Employment Modal */
    $('#employModal').on('show.bs.modal', function(e) {
        var tableName = e.relatedTarget.getAttribute('name');
        showEmployTable(tableName);
    });
    $('#employModal').on('hidden.bs.modal', function() {
        $('#employModalTable').empty();
    });

    /* People Modal */
    $('#peopleModal').on('show.bs.modal', function(e) {
        var personName = e.relatedTarget.getAttribute('name');
        showPeopleDetail(personName);
    });
    $('#peopleModal').on('hidden.bs.modal', function() {
        $('#peopleModalInfo').empty();
    });

    /* Research Modal */
    $('#researchModal').on('show.bs.modal', function(e) {
        var name = e.relatedTarget.getAttribute('name');
        if (e.relatedTarget.getAttribute('class') == "area") {
            showInterestDetail(name);
        } else {
            showResearchDetail(name);
        }
    });
    $('#researchModal').on('hidden.bs.modal', function() {
        $('#researchModalDetail').empty();
    });

    /* News Modal */
    $('#newsModal').on('show.bs.modal', function(e) {
        var time = e.relatedTarget.getAttribute('name');
        showNewsDetail(time);
    });
    $('#newsModal').on('hidden.bs.modal', function() {
        $('#newsModalDetail').empty();
    });

    /* People Tabs */
    $('#tab-faculty').click(function(e) {
        e.preventDefault();
        $('.people-tab').each(function() {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        $('#tab-faculty a').tab('show');
    });
    $('#tab-staff').click(function(e) {
        e.preventDefault();
        $('.people-tab').each(function() {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        $('#tab-staff a').tab('show');
    });

    /* Research Tabs */
    $('#tab-byInterestArea').click(function(e) {
        e.preventDefault();
        $('.research-tab').each(function() {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        $('#tab-byInterestArea a').tab('show');
    });
    $('#tab-byFaculty').click(function(e) {
        e.preventDefault();
        $('.research-tab').each(function() {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        $('#tab-byFaculty a').tab('show');
    });
});

/* Helper functions */
function appendResourceDetail(key, obj, title) {
    var panel = $('<div></div>').addClass('tab-pane fade')
                    .attr('id', 'res-' + key)
                    .attr('role', 'tabpanel');
    var hr = '<hr />';
    var br = '<br />';
    switch (key) {
        case "studyAbroad":
            var pTitle = $('<div></div>').addClass('panel-section')
                                .append($('<h2></h2>').text(title));
            var sec1 = $('<div></div>').addClass('panel-section')
                            .append($('<h5></h5>').text("Description"))
                            .append($('<p></p>').text(obj.description));
            var sec2 = $('<div></div>').addClass('panel-section')
                            .append($('<h5></h5>').text("Places"));
            $.each(obj.places, function(index, place) {
                sec2.append($('<strong></strong>').text(place.nameOfPlace));
                sec2.append(br);
                sec2.append($('<p></p>').text(place.description));
            });
            panel.append(pTitle);
            panel.append(sec1);
            panel.append(hr);
            panel.append(sec2);
            panel.addClass('in active');
            break;
        case "studentServices":
            var pTitle = $('<div></div>').addClass('panel-section')
                                .append($('<h2></h2>').text(title));
            var sub1 = obj.academicAdvisors;
            var sec1 = $('<div></div>').addClass('panel-section')
                            .append($('<h5></h5>').text(sub1.title))
                            .append($('<p></p>').text(sub1.description));
            var sec1_1 = $('<a></a>').text(sub1.faq.title)
                                .attr('href', sub1.faq.contentHref);
            sec1.append(sec1_1);
            var sub2 = obj.professonalAdvisors;
            var sec2 = $('<div></div>').addClass('panel-section')
                            .append($('<h5></h5>').text(sub2.title));
            $.each(sub2.advisorInformation, function(index, info) {
                var advisor = $('<div></div>').addClass('panel-card')
                                    .append($('<strong></strong>').text(info.name))
                                    .append($('<p></p>').text(info.department))
                                    .append($('<p></p>').text(info.email));
                sec2.append(advisor);
            });
            var sub3 = obj.facultyAdvisors;
            var sec3 = $('<div></div>').addClass('panel-section')
                            .append($('<h5></h5>').text(sub3.title))
                            .append($('<p></p>').text(sub3.description));
            var sub4 = obj.istMinorAdvising;
            var sec4 = $('<div></div>').addClass('panel-section')
                            .append($('<h5></h5>').text(sub4.title));
            $.each(sub4.minorAdvisorInformation, function(index, info) {
                var advisor = $('<div></div>').addClass('panel-card')
                                    .append($('<strong></strong>').text(info.advisor))
                                    .append($('<p></p>').text(info.title))
                                    .append($('<p></p>').text(info.email));
                sec4.append(advisor);
            });
            panel.append(pTitle);
            panel.append(sec1);
            panel.append(hr);
            panel.append(sec2);
            panel.append(hr);
            panel.append(sec3);
            panel.append(hr);
            panel.append(sec4);
            break;
        case "tutorsAndLabInformation":
            var pTitle = $('<div></div>').addClass('panel-section')
                                .append($('<h2></h2>').text(title))
                                .append($('<h5></h5>').text("Description"))
                                .append($('<p></p>').text(obj.description));
            var labLink = $('<a></a>').text("Tutoring Lab Hours")
                                .attr('href', obj.tutoringLabHoursLink);
            panel.append(pTitle);
            panel.append(labLink);
            break;
        case "studentAmbassadors":
            var pTitle = $('<div></div>').addClass('panel-section')
                                .append($('<h2></h2>').text(title));
            panel.append(pTitle);
            var sub1 = obj.ambassadorsImageSource;
            var sec1 = $('<div></div>').addClass('panel-section')
                            .append($('<img />').attr('src', sub1));
            panel.append(sec1);
            var contents = obj.subSectionContent;
            for (var i = 0; i < contents.length; i ++) {
                var sec = $('<div></div>').addClass('panel-section')
                                .append($('<h5></h5>').text(contents[i].title))
                                .append($('<p></p>').text(contents[i].description));
                panel.append(sec);
                if (i == contents.length - 1) {
                    var applyLink = $('<a></a>').text("Application Form Link")
                                            .attr('href', obj.applicationFormLink);
                    panel.append(applyLink);
                }
                panel.append(hr);
            }
            var sec3 = $('<div></div>').addClass('panel-section')
                            .append($('<h5></h5>').text("Note"))
                            .append($('<p></p>').text(obj.note));
            panel.append(sec3);
            break;
        case "forms":
            var pTitle = $('<div></div>').addClass('panel-section')
                                .append($('<h2></h2>').text(title));
            var sec1 = $('<div></div>').addClass('panel-section')
                            .append($('<h5></h5>').text("Graduate Forms"));
            $.each(obj.graduateForms, function(index, form) {
                var formLink = $('<a></a>').text(form.formName)
                                    .attr('href', form.href);
                sec1.append(formLink);
                sec1.append(br);
            });
            var sec2 = $('<div></div>').addClass('panel-section')
                            .append($('<h5></h5>').text("Undergraduate Forms"));
            $.each(obj.undergraduateForms, function(index, form) {
                var formLink = $('<a></a>').text(form.formName)
                                    .attr('href', form.href);
                sec2.append(formLink);
                sec2.append(br);
            });
            panel.append(pTitle);
            panel.append(sec1);
            panel.append(hr);
            panel.append(sec2);
            break;
        case "coopEnrollment":
            var pTitle = $('<div></div>').addClass('panel-section')
                                .append($('<h2></h2>').text(title));
            panel.append(pTitle);
            var sections = obj.enrollmentInformationContent;
            for (var i = 0; i < sections.length; i ++) {
                var sec = $('<div></div>').addClass('panel-section')
                                .append($('<h5></h5>').text(sections[i].title))
                                .append($('<p></p>').text(sections[i].description));
                panel.append(sec);
                if (i < sections.length - 1) {
                    panel.append(hr);
                }
            }
            var jobLink = $('<a></a>').text("RIT JobZone Guide")
                                .attr('href', obj.RITJobZoneGuidelink);
            panel.append(jobLink);
            break;
    }
    $('#panel-board').append(panel);
}

function showMinorDetail(minorName) {
    dataService().getMinorsData()
        .done(function(minorsData) {
            for (var i = 0; i < minorsData.length; i ++) {
                var minor = minorsData[i];
                if (minor.name == minorName) {
                    $('#minorModalLabel').text(minor.title);
                    $('#minorModalDesc').text(minor.description);
                    $.each(minor.courses, function(index, course) {
                        var minorCourse = $('<p></p>').text(course);
                        $('#minorModalCourses').append(minorCourse);
                    });
                    $('#minorModalNote').text(minor.note);
                }
            }
        });
}

function showEmployTable(tableName) {
    dataService().getEmploymentData()
        .done(function(employData) {
            var table;
            // set title and table data
            if (tableName == "coopTable") {
                $('#employModalLabel').text(employData.coopTable.title);
                table = employData.coopTable.coopInformation;
            } else if (tableName == "employmentTable") {
                $('#employModalLabel').text(employData.employmentTable.title);
                table = employData.employmentTable.professionalEmploymentInformation;
            }
            // append headers and table
            var tableHeaders = $('<tr></tr>');
            $.each(table[0], function(key, item) {
                tableHeaders.append($('<th></th>').text(key.toUpperCase()));
            });
            $('#employModalTable').append(tableHeaders);
            $.each(table, function(index, employ) {
                var row = $('<tr></tr>');
                $.each(employ, function(key, item) {
                    row.append($('<td></td>').text(item));
                });
                $('#employModalTable').append(row);
            });
        });
}

function showPeopleDetail(personName) {
    dataService().getPeopleData()
        .done(function(peopleData) {
            var person = getPeopleDetail(peopleData.faculty, personName);
            if (person === null) {
                person = getPeopleDetail(peopleData.staff, personName);
            }
            $('#peopleModalLabel').text(person.name);
            $('#peopleModalSub').text(person.title);
            if (person.tagline) {
                $('#peopleModalSub').append(' | ' + person.tagline);
            }
            $('#peopleModalImage').attr('src', person.imagePath);
            if (person.office) {
                $('#peopleModalInfo').append($('<p></p>').text(person.office));
            }
            if (person.phone) {
                $('#peopleModalInfo').append($('<p></p>').text(person.phone));
            }
            if (person.email) {
                $('#peopleModalInfo').append($('<p></p>').text(person.email));
            }
            if (person.website) {
                $('#peopleModalInfo').append($('<p></p>').text(person.website));
            }
            if (person.facebook) {
                $('#peopleModalInfo').append($('<p></p>').text(person.facebook));
            }
            if (person.twitter) {
                $('#peopleModalInfo').append($('<p></p>').text(person.twitter));
            }
        });
}

function getPeopleDetail(people, name) {
    var person = null;
    $.each(people, function(index, per) {
        if (per.username == name) {
            person = per;
        }
    });
    return person;
}

function showPeopleImage(people, element) {
    $.each(people, function(index, per) {
        var person = $('<div></div>')
                        .addClass('person')
                        .attr('name', per.username)
                        .attr('data-toggle', 'modal')
                        .attr('data-target', '#peopleModal')
                        .css('background-image', 'url(' + per.imagePath + ')');
        var name = $('<div></div>')
                        .addClass('person-name')
                        .append($('<p></p>').text(per.name));
        person.append(name);
        element.append(person);
    });
}

function showInterestDetail(areaName) {
    dataService().getResearchData()
        .done(function(researchData) {
            $('#researchModalLabel').text(areaName);
            var interests = researchData.byInterestArea;
            $.each(interests, function(index, interest) {
                if (interest.areaName == areaName) {
                    $.each(interest.citations, function(index, citation) {
                        $('#researchModalDetail').append($('<li></li>').text(citation));
                    });
                }
            });
        });
}

function showResearchDetail(facultyName) {
    dataService().getResearchData()
        .done(function(researchData) {
            $('#researchModalLabel').text(facultyName);
            var faculties = researchData.byFaculty;
            $.each(faculties, function(index, faculty) {
                if (faculty.facultyName == facultyName) {
                    $.each(faculty.citations, function(index, citation) {
                        $('#researchModalDetail').append($('<li></li>').text(citation));
                    });
                }
            });
        });
}

function showNewsDetail(time) {
    dataService().getNewsData()
        .done(function(newsData) {
            $.each(newsData, function(key, timeLine) {
                if (key == time) {
                    $.each(timeLine, function(index, news) {
                        $('#newsModalLabel').text(key);
                        var date = $('<h4></h4>').append($('<small></small>').text(news.date));
                        var title = $('<h4></h4>').text(news.title);
                        var desc = $('<p></p>').text(news.description);
                        var newsDiv = $('<div></div>').addClass('newsDiv')
                                            .append(date)
                                            .append(title)
                                            .append(desc);
                        $('#newsModalDetail').append(newsDiv);
                    });
                }
            });
        });
}

function setIcon(degreeName) {
    var icon;
    switch (degreeName) {
        case "wmc":
            icon = '<i class="fa fa-globe fa-5x"></i>';
            break;
        case "hcc":
            icon = '<i class="fa fa-user fa-5x"></i>';
            break;
        case "cit":
            icon = '<i class="fa fa-desktop fa-5x"></i>';
            break;
        case "ist":
            icon = '<i class="fa fa-internet-explorer fa-5x"></i>';
            break;
        case "hci":
            icon = '<i class="fa fa-hand-pointer-o fa-5x"></i>';
            break;
        case "nsa":
            icon = '<i class="fa fa-server fa-5x"></i>';
            break;
        case "DBDDI-MN":
            icon = '<i class="fa fa-database fa-4x"></i>';
            break;
        case "GIS-MN":
            icon = '<i class="fa fa-map-marker fa-4x"></i>';
            break;
        case "MEDINFO-MN":
            icon = '<i class="fa fa-medkit fa-4x"></i>';
            break;
        case "MDDEV-MN":
            icon = '<i class="fa fa-android fa-4x"></i>';
            break;
        case "MDEV-MN":
            icon = '<i class="fa fa-mobile fa-5x"></i>';
            break;
        case "NETSYS-MN":
            icon = '<i class="fa fa-server fa-4x"></i>';
            break;
        case "WEBDD-MN":
            icon = '<i class="fa fa-html5 fa-4x"></i>';
            break;
        case "WEBD-MN":
            icon = '<i class="fa fa-code fa-4x"></i>';
            break;
        case "HCI":
            icon = '<i class="fa fa-hand-pointer-o fa-5x"></i>';
            break;
        case "Education":
            icon = '<i class="fa fa-graduation-cap fa-5x"></i>';
            break;
        case "Geo":
            icon = '<i class="fa fa-map fa-5x"></i>';
            break;
        case "Database":
            icon = '<i class="fa fa-database fa-5x"></i>';
            break;
        case "Analytics":
            icon = '<i class="fa fa-bar-chart fa-5x"></i>';
            break;
        case "Web":
            icon = '<i class="fa fa-globe fa-5x"></i>';
            break;
        case "Networking":
            icon = '<i class="fa fa-server fa-5x"></i>';
            break;
        case "Mobile":
            icon = '<i class="fa fa-mobile fa-5x"></i>';
            break;
        case "Health Informatics":
            icon = '<i class="fa fa-heartbeat fa-5x"></i>';
            break;
        case "Programming":
            icon = '<i class="fa fa-code fa-5x"></i>';
            break;
        case "System Administration":
            icon = '<i class="fa fa-terminal fa-5x"></i>';
            break;
        case "Ubiquitous Computing":
            icon = '<i class="fa fa-keyboard-o fa-5x"></i>';
            break;
    }

    return icon;
}
