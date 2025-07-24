import React from 'react';
import styled from 'styled-components';
import type { SkillCategory} from '../../types';
// DevOps & Infrastructure Icons
import { FaDocker, FaUbuntu } from 'react-icons/fa';
import { SiKubernetes, SiTerraform } from 'react-icons/si';
// Cloud Platform Icons
import { FaAws, FaCloud } from 'react-icons/fa';
// CI/CD & Automation Icons
import { SiJenkins, SiGithubactions, SiAnsible, SiGit } from 'react-icons/si';
// Monitoring & Observability Icons
import { SiPrometheus, SiGrafana } from 'react-icons/si';
import { FaSearch } from 'react-icons/fa'; // For ELK Stack

const SkillsSection = styled.section`
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 0.5rem;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const CategoryCard = styled.div`
  background: rgba(35, 39, 42, 0.95);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  border: 1px solid rgba(57, 204, 204, 0.2);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    border-radius: 12px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--pipeline-cyan), transparent);
    border-radius: 20px 20px 0 0;

    @media (max-width: 768px) {
      border-radius: 16px 16px 0 0;
    }

    @media (max-width: 480px) {
      border-radius: 12px 12px 0 0;
    }
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(255, 153, 0, 0.10);

    @media (max-width: 768px) {
      transform: translateY(-2px);
    }
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    justify-content: center;
    text-align: center;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const CategoryTitle = styled.h3<{ color: string }>`
  color: ${props => props.color};
  margin: 0;
  font-size: 1.4rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const CategoryDescription = styled.p`
  color: var(--text-secondary);
  margin: 0 0 1.5rem 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 1.2rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

const ToolCard = styled.div`
  background: var(--light-surface);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(57, 204, 204, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.2rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 6px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--pipeline-cyan), transparent);
    border-radius: 12px 12px 0 0;

    @media (max-width: 768px) {
      border-radius: 8px 8px 0 0;
    }

    @media (max-width: 480px) {
      border-radius: 6px 6px 0 0;
    }
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(57, 204, 204, 0.4);
    box-shadow: 0 8px 20px rgba(255, 153, 0, 0.10);

    @media (max-width: 768px) {
      transform: translateY(-2px);
    }
  }
`;

const ToolHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(57, 204, 204, 0.1);

  @media (max-width: 768px) {
    margin-bottom: 0.8rem;
    padding-bottom: 0.6rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 0.6rem;
    gap: 0.5rem;
    padding-bottom: 0.5rem;
  }
`;

const ToolIcon = styled.div`
  font-size: 1.8rem;
  color: var(--pipeline-cyan);
  display: flex;
  align-items: center;
  filter: drop-shadow(0 2px 4px rgba(57, 204, 204, 0.3));

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const ToolName = styled.h4`
  color: var(--pipeline-cyan);
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ToolDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0.5rem 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin: 0.4rem 0;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin: 0.3rem 0;
  }
`;

const ImpactList = styled.ul`
  margin: 0.8rem 0 0 0;
  padding: 0;
  list-style: none;

  @media (max-width: 768px) {
    margin: 0.6rem 0 0 0;
  }

  @media (max-width: 480px) {
    margin: 0.5rem 0 0 0;
  }
`;

const ImpactItem = styled.li`
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin: 0.3rem 0;
  padding-left: 1rem;
  position: relative;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin: 0.25rem 0;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin: 0.2rem 0;
    padding-left: 0.8rem;
  }

  &:before {
    content: '▶';
    color: var(--pipeline-cyan);
    position: absolute;
    left: 0;
    font-size: 0.7rem;

    @media (max-width: 480px) {
      font-size: 0.6rem;
    }
  }
`;

const CategoryTag = styled.span`
  background: rgba(57, 204, 204, 0.15);
  color: var(--pipeline-cyan);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.85rem;
  margin-top: 0.75rem;
  display: inline-block;
  font-weight: 600;
  border: 1px solid rgba(57, 204, 204, 0.2);
  box-shadow: 0 2px 4px rgba(57, 204, 204, 0.1);

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
    margin-top: 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    margin-top: 0.5rem;
    border-radius: 6px;
  }
`;

const Skills: React.FC = () => {

  const skillCategories: SkillCategory[] = [
    {
      name: 'DevOps & Infrastructure',
      description: 'Tools and platforms for building, deploying, and maintaining scalable infrastructure',
      color: 'var(--pipeline-cyan)',
      tools: [
        {
          name: 'Docker',
          category: 'Containerization',
          description: 'Containerization platform for building, sharing, and running applications',
          impact: [
            'Learned containerization fundamentals and best practices',
            'Studied multi-stage builds and layer optimization techniques'
          ],
          icon: 'docker'
        },
        {
          name: 'Kubernetes',
          category: 'Orchestration',
          description: 'Container orchestration platform for automated deployment and scaling',
          impact: [
            'Learned Kubernetes cluster architecture and core concepts',
            'Studied pod scheduling, service discovery, and load balancing'
          ],
          icon: 'kubernetes'
        },
        {
          name: 'Terraform',
          category: 'Infrastructure as Code',
          description: 'Infrastructure provisioning and management through declarative configuration',
          impact: [
            'Learned infrastructure as code principles and best practices',
            'Studied resource management and state file handling'
          ],
          icon: 'terraform'
        },
        {
          name: 'Ubuntu Server',
          category: 'Operating System',
          description: 'Linux server administration and system management',
          impact: [
            'Learned Linux system administration and command-line operations',
            'Studied package management and service configuration'
          ],
          icon: 'ubuntu'
        }
      ]
    },
    {
      name: 'Cloud Platforms',
      description: 'Cloud infrastructure services and platform management',
      color: 'var(--info-blue)',
      tools: [
        {
          name: 'Amazon Web Services (AWS)',
          category: 'Cloud Provider',
          description: 'Comprehensive cloud computing platform with extensive service portfolio',
          impact: [
            'Learned core AWS services: EC2, S3, VPC, and IAM',
            'Studied auto-scaling, load balancing, and fault tolerance'
          ],
          icon: 'aws'
        },
        {
          name: 'Microsoft Azure',
          category: 'Cloud Provider',
          description: 'Enterprise cloud platform with integrated development tools',
          impact: [
            'Learned Azure Resource Manager and service architecture',
            'Studied Azure DevOps integration and CI/CD pipelines'
          ],
          icon: 'azure'
        }
      ]
    },
    {
      name: 'CI/CD & Automation',
      description: 'Continuous integration, deployment, and process automation tools',
      color: 'var(--success-green)',
      tools: [
        {
          name: 'Git',
          category: 'Version Control',
          description: 'Distributed version control system for tracking code changes',
          impact: [
            'Learned Git workflow strategies and branching models',
            'Studied merge conflict resolution and code collaboration'
          ],
          icon: 'git'
        },
        {
          name: 'Jenkins',
          category: 'CI/CD Platform',
          description: 'Automation server for building, testing, and deploying applications',
          impact: [
            'Learned Jenkins pipeline creation and job configuration',
            'Studied plugin ecosystem and build automation'
          ],
          icon: 'jenkins'
        },
        {
          name: 'GitHub Actions',
          category: 'CI/CD Platform',
          description: 'Native GitHub automation platform for workflows and deployments',
          impact: [
            'Learned workflow automation and event-driven triggers',
            'Studied action marketplace and custom action development'
          ],
          icon: 'github-actions'
        },
        {
          name: 'Ansible',
          category: 'Configuration Management',
          description: 'Agentless automation platform for configuration and deployment',
          impact: [
            'Learned playbook creation and task automation',
            'Studied inventory management and variable handling'
          ],
          icon: 'ansible'
        }
      ]
    },
    {
      name: 'Monitoring & Observability',
      description: 'System monitoring, logging, and performance observability tools',
      color: 'var(--warning-yellow)',
      tools: [
        {
          name: 'Prometheus',
          category: 'Metrics Collection',
          description: 'Time-series database and monitoring system with alerting',
          impact: [
            'Learned metrics collection and PromQL query language',
            'Studied alerting rules and notification management'
          ],
          icon: 'prometheus'
        },
        {
          name: 'Grafana',
          category: 'Visualization',
          description: 'Analytics and monitoring platform with rich visualization capabilities',
          impact: [
            'Learned dashboard design and panel configuration',
            'Studied data source integration and query optimization'
          ],
          icon: 'grafana'
        },
        {
          name: 'ELK Stack',
          category: 'Logging',
          description: 'Elasticsearch, Logstash, and Kibana for log management',
          impact: [
            'Learned Elasticsearch indexing, searching, and cluster management',
            'Mastered Logstash pipeline configuration and data transformation'
          ],
          icon: 'elk'
        }
      ]
    }
  ];

  return (
    <SkillsSection id="skills">
      <h2 style={{ color: 'var(--pipeline-cyan)', fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
        Skills & Tools
      </h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '1.1rem', marginBottom: '3rem' }}>
        Proven technologies delivering measurable business impact and operational excellence
      </p>
      
      <CategoryGrid>
        {skillCategories.map((category) => (
          <CategoryCard key={category.name}>
            <CategoryHeader>
              <CategoryTitle color={category.color}>{category.name}</CategoryTitle>
            </CategoryHeader>
            <CategoryDescription>{category.description}</CategoryDescription>
            
            <ToolsGrid>
              {category.tools.map((tool) => (
                <ToolCard key={tool.name}>
                  <ToolHeader>
                    <ToolIcon>
                      {tool.icon === 'docker' && <FaDocker />}
                      {tool.icon === 'kubernetes' && <SiKubernetes />}
                      {tool.icon === 'terraform' && <SiTerraform />}
                      {tool.icon === 'ubuntu' && <FaUbuntu />}
                      {tool.icon === 'aws' && <FaAws />}
                      {tool.icon === 'azure' && <FaCloud />}
                      {tool.icon === 'git' && <SiGit />}
                      {tool.icon === 'jenkins' && <SiJenkins />}
                      {tool.icon === 'github-actions' && <SiGithubactions />}
                      {tool.icon === 'ansible' && <SiAnsible />}
                      {tool.icon === 'prometheus' && <SiPrometheus />}
                      {tool.icon === 'grafana' && <SiGrafana />}
                      {tool.icon === 'elk' && <FaSearch />}
                    </ToolIcon>
                    <ToolName>{tool.name}</ToolName>
                  </ToolHeader>
                  <CategoryTag>{tool.category}</CategoryTag>
                  <ToolDescription>{tool.description}</ToolDescription>
                  <ImpactList>
                    {tool.impact.map((impact, index) => (
                      <ImpactItem key={index}>{impact}</ImpactItem>
                    ))}
                  </ImpactList>
                </ToolCard>
              ))}
            </ToolsGrid>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </SkillsSection>
  );
};

export default Skills; 