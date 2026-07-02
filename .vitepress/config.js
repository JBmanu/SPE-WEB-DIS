import {defineConfig} from 'vitepress'
import {withMermaid} from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
// -------- SPE --------
let courseSPE = "/spe"
let speSummary = courseSPE + "/slides-summary"

// -------- WEB --------
let courseWEB = "/web"
let webSummaries = courseWEB + "/slides-summary"

// -------- DISTRIBUTED --------
let courseDistributed = "/distributed"
let distributedSummaryModule1 = courseDistributed + "/module-1-summary"
let distributedSummaryModule2 = courseDistributed + "/module-2-summary"

// -------- PROJECT --------
let project = "/project"
let projectDDD = "/DDD"

// -------- PROPOSTA --------
let proposta = "/proposta"

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
                    text: 'Courses',
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
                                        {text: '00-indice', link: `${speSummary}/00-INDICE`},
                                        {text: '01-devops', link: `${speSummary}/01-devops`},
                                        {text: '02-kotlin', link: `${speSummary}/02-kotlin`},
                                        {text: '03-kotlin-dsl-interne', link: `${courseSPE}/03-kotlin-dsl-interne`},
                                        {
                                            text: '04-build-automation-gradle',
                                            link: `${speSummary}/04-build-automation-gradle`
                                        },
                                        {
                                            text: '05-versioning-e-licensing',
                                            link: `${speSummary}/05-versioning-e-licensing`
                                        },
                                        {
                                            text: '06-continuous-integration',
                                            link: `${speSummary}/06-continuous-integration`
                                        },
                                        {
                                            text: '07-git-avanzato-e-workflow',
                                            link: `${speSummary}/07-git-avanzato-e-workflow`
                                        },
                                        {
                                            text: '08-containerizzazione-docker',
                                            link: `${speSummary}/08-containerizzazione-docker`
                                        },
                                        {
                                            text: '09-DDD-domain-driven-design',
                                            link: `${speSummary}/09-domain-driven-design`
                                        },
                                        {
                                            text: '10-model-driven-development',
                                            link: `${speSummary}/10-model-driven-development`
                                        },
                                        {
                                            text: '11-multiplatform-programming',
                                            link: `${speSummary}/11-multiplatform-programming`
                                        },
                                        {text: '12-kubernetes', link: `${speSummary}/12-kubernetes`},
                                        {text: '13-extra', link: `${speSummary}/13-extra-complementi-pratici`},
                                    ]

                                },

                            ]
                        },
                        {
                            text: 'WEB',
                            collapsed: true,
                            items: [
                                {text: 'Exam-requirements', link: `${courseWEB}/requirements`},
                                {
                                    text: 'Summary',
                                    collapsed: true,
                                    items: [
                                        {text: '00-Indice', link: `${webSummaries}/00-Indice_e_Introduzione`},
                                        {
                                            text: 'A-Soluzioni architetturali, client e server',
                                            link: `${webSummaries}/A-Soluzioni_architetturali__client_e_server`
                                        },
                                        {
                                            text: 'B-Stack MEAN (e sue varianti)`',
                                            link: `${webSummaries}/B-Stack_MEAN_e_sue_varianti_`
                                        },
                                        {
                                            text: 'C-HCI e superset per i fogli di stile',
                                            link: `${webSummaries}/C-HCI_e_superset_per_i_fogli_di_stile`
                                        },
                                        {text: 'D-Seminari', link: `${webSummaries}/D-Seminari`},
                                    ]
                                }
                            ]
                        },
                        {
                            text: 'DISTRIBUTED',
                            collapsed: true,
                            items: [
                                {text: 'Exam-module-1-requirements', link: `${courseDistributed}/01-requirements`},
                                {text: 'Exam-module-2-requirements', link: `${courseDistributed}/02-requirements`},
                                {
                                    text: 'Module-1-Summary',
                                    collapsed: true,
                                    items: [
                                        {text: '00-Indice', link: `${distributedSummaryModule1}/00-Indice_e_Struttura`},
                                        {
                                            text: '01-A0_Organizzazione_Corso',
                                            link: `${distributedSummaryModule1}/01-A0_Organizzazione_Corso`
                                        },
                                        {
                                            text: '02-Fondamenti_M0_M2_M4_M5',
                                            link: `${distributedSummaryModule1}/02-Fondamenti_M0_M2_M4_M5`
                                        },
                                        {
                                            text: '03-Dependability_M1',
                                            link: `${distributedSummaryModule1}/03-Dependability_M1`
                                        },
                                        {
                                            text: '04-Replication_Consistency_M3',
                                            link: `${distributedSummaryModule1}/04-Replication_Consistency_M3`
                                        },
                                        {
                                            text: '05-Tempo_Spazio_M6_M7',
                                            link: `${distributedSummaryModule1}/05-Tempo_Spazio_M6_M7`
                                        },
                                        {
                                            text: '06-Architetture_ProcessAlgebra_M8_M7bis',
                                            link: `${distributedSummaryModule1}/06-Architetture_ProcessAlgebra_M8_M7bis`
                                        },
                                        {
                                            text: '07-CAP_Theorem_C1',
                                            link: `${distributedSummaryModule1}/07-CAP_Theorem_C1`
                                        },
                                        {
                                            text: '08-Logging_Checkpointing_C2',
                                            link: `${distributedSummaryModule1}/08-Logging_Checkpointing_C2`
                                        },
                                        {
                                            text: '09-Logical_Clocks_C5',
                                            link: `${distributedSummaryModule1}/09-Logical_Clocks_C5`
                                        },
                                        {
                                            text: '10-Distributed_Consensus_C3',
                                            link: `${distributedSummaryModule1}/10-Distributed_Consensus_C3`
                                        },
                                        {
                                            text: '11-Code_Mobility_Kubernetes_C6',
                                            link: `${distributedSummaryModule1}/11-Code_Mobility_Kubernetes_C6`
                                        },
                                        {
                                            text: '12-DLT_Blockchain_SmartContracts_C4',
                                            link: `${distributedSummaryModule1}/12-DLT_Blockchain_SmartContracts_C4`
                                        },
                                    ]
                                },
                                {
                                    text: 'Module-2-Summary',
                                    collapsed: true,
                                    items: [
                                        {text: '00-Indice', link: `${distributedSummaryModule1}/00-Indice_Modulo2`},
                                        {
                                            text: '01-About_Course_Mod2',
                                            link: `${distributedSummaryModule1}/01-About_Course_Mod2`
                                        },
                                        {
                                            text: '02-Preliminaries_DS_Engineering',
                                            link: `${distributedSummaryModule1}/02-Preliminaries_DS_Engineering`
                                        },
                                        {
                                            text: '03-Communication_Mechanisms',
                                            link: `${distributedSummaryModule1}/03-Communication_Mechanisms`
                                        },
                                        {
                                            text: '04-Distributed_Pong_Case_Study',
                                            link: `${distributedSummaryModule1}/04-Distributed_Pong_Case_Study`
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            text: 'Exams',
                            collapsed: true,
                            items: [
                                {text: 'Requirements', link: `${proposta}/All-requirements`},
                                {text: 'Tecnologie', link: `${proposta}/Teconologie`},
                                {text: 'Proposte', link: `${proposta}/Proposte`},
                            ]
                        },
                        // {text: 'Proposte', link: `${proposta}/Proposte`}
                    ]
                },
                {
                    text: 'Project',
                    items: [
                        {
                            text: 'DDD',
                            collapsed: true,
                            items: [
                                {text: 'DDD', link: `${project}/${projectDDD}/DDD`},
                                {text: 'Cross-Context', link: `${project}/${projectDDD}/Cross-Context-Events`},
                            ]
                        },
                        {text: 'Features', link: `${project}/Features`},
                        {text: 'Features vs Requirements', link: `${project}/Feature vs Requirements Summary`},
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
