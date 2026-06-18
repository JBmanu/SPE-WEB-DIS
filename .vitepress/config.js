import {defineConfig} from 'vitepress'
import {withMermaid} from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
// -------- SPE --------
let courseSPE = "/spe"
let speSummaries = courseSPE + "/slides-summary"

// -------- WEB --------
let courseWEB = "/web"
let webSummaries = courseWEB + "/slides-summary"

// -------- DISTRIBUTED --------
let courseDistributed = "/distributed"
let distributedSummaries = courseDistributed + "/slides-summary"


export default withMermaid(
    defineConfig({
        base: '/SPE-WEB-DIS/',
        title: "SPE-WEB-DIS",
        description: "Courses summaries of Software Project Engineering, Web Programming and Distributed Systems",
        themeConfig: {
            // https://vitepress.dev/reference/default-theme-config
            nav: [
                {text: 'Home', link: '/'},
            ],

            sidebar: [
                {
                    text: 'Report',
                    items: [
                        {
                            text: 'SPE',
                            collapsed: true,
                            items: [
                                {text: 'Exam-requirements', link: `${courseSPE}/requirements`},
                                {
                                    text: 'Summary',
                                    collapsed: true,
                                    items: [
                                        {text: '00-indice', link: `${speSummaries}/00-INDICE`},
                                        {text: '01-devops', link: `${speSummaries}/01-devops`},
                                        {text: '02-kotlin', link: `${speSummaries}/02-kotlin`},
                                        // {text: '03-', link: `${courseSPE}/1-meeting`},
                                        {text: '04-build-automation-gradle', link: `${speSummaries}/04-build-automation-gradle`},
                                        {text: '05-versioning-e-licensing', link: `${speSummaries}/05-versioning-e-licensing`},
                                        {text: '06-continuous-integration', link: `${speSummaries}/06-continuous-integration`},
                                        {text: '07-git-avanzato-e-workflow', link: `${speSummaries}/07-git-avanzato-e-workflow`},
                                        {text: '08-containerizzazione-docker', link: `${speSummaries}/08-containerizzazione-docker`},
                                        {text: '09-DDD-domain-driven-design', link: `${speSummaries}/09-domain-driven-design`},
                                        {text: '10-model-driven-development', link: `${speSummaries}/10-model-driven-development`},
                                        {text: '11-multiplatform-programming', link: `${speSummaries}/11-multiplatform-programming`},
                                        {text: '12-kubernetes', link: `${speSummaries}/12-kubernetes`},
                                        {text: '13-extra', link: `${speSummaries}/13-extra-complementi-pratici`},
                                    ]

                                },

                            ]
                        },
                        {
                            text: 'WEB',
                            collapsed: true,
                            items: [
                                // {text: '1-Meeting', link: `${courseWEB}/1-meeting`},
                                {
                                    text: 'Summaries',
                                    collapsed: true,
                                    items: []
                                }
                            ]
                        },
                        {
                            text: 'DISTRIBUTED',
                            collapsed: true,
                            items: [
                                // {text: '1-Meeting', link: `${courseDistributed}/1-meeting`},
                                {
                                    text: 'Summaries',
                                    collapsed: true,
                                    items: []
                                }
                            ]
                        },
                        {
                            text: 'Exams-Requirements',
                            collapsed: true,
                            items: [
                                {text: 'SPE', link: `${courseSPE}/requirements`},
                                // {text: 'WEB', link: `${courseWEB}/requirements`},
                                // {text: 'DISTRIBUTED', link: `${courseDistributed}/requirements`},
                            ]
                        }
                    ]
                },
                {
                    text: 'Allegati',
                    items: [
                        {
                            text: 'Scoping',
                            collapsed: true,
                            items: [
                                // {text: '1-Meeting', link: `${scopingPath}/1-meeting`},
                                // {text: '2-Meeting', link: `${scopingPath}/2-meeting`},
                                // {text: '3-Meeting', link: `${scopingPath}/3-meeting`},
                            ]
                        },
                        {
                            text: 'Planning',
                            collapsed: true,
                            items: [
                                // {text: 'WBS', link: `${planningPath}/WBS`},
                                // {text: 'PND', link: `${planningPath}/PND`},
                                // {text: 'Gantt', link: `${planningPath}/Gantt`},
                                // {text: 'RBS', link: `${planningPath}/RBS`},
                                // {text: 'Risk Management', link: `${planningPath}/Risk-Management-Plan`},
                            ]
                        }
                    ]

                }
            ],

            socialLinks: [
                {icon: 'github', link: 'https://github.com/JBmanu/SPE-WEB-DIS'}
            ]
        }
    })
)
