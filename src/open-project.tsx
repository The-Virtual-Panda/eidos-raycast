// Open Project (Raycast Extension REQ1, REQ2): the projects this machine knows, opened in Eidos MD.
import { Action, ActionPanel, Icon, Keyboard, List } from "@raycast/api";
import { FileActions, OpenInEditor, openProject, ProjectQuicklink, relativeTime, useProjects } from "./shared";
import SearchProject from "./search-project";

export default function OpenProject() {
  const { data: projects, isLoading, revalidate } = useProjects();
  return (
    <List isLoading={isLoading} searchBarPlaceholder="Find a project">
      {projects?.length === 0 && !isLoading ? (
        <List.EmptyView
          icon={Icon.Folder}
          title="No Eidos projects found"
          description="Open a project in Eidos MD once, or add the folders that hold your projects in this extension's preferences."
        />
      ) : null}
      {(projects ?? []).map((project) => (
        <List.Item
          key={project.root}
          icon={{ source: "icon.png" }}
          title={project.name}
          subtitle={project.root}
          keywords={project.root.split(/[\\/]/).filter((part) => part !== "")}
          accessories={
            project.opened
              ? [{ text: relativeTime(project.opened), tooltip: `Opened ${new Date(project.opened).toLocaleString()}` }]
              : []
          }
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <Action title="Open in Eidos MD" icon={Icon.AppWindow} onAction={() => openProject(project.root)} />
                <Action.Push
                  title="Search in Project"
                  icon={Icon.MagnifyingGlass}
                  target={<SearchProject initialRoot={project.root} />}
                  shortcut={{ macOS: { modifiers: ["cmd"], key: "f" }, Windows: { modifiers: ["ctrl"], key: "f" } }}
                />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <OpenInEditor path={project.root} />
                <FileActions path={project.root} />
                <ProjectQuicklink project={project} />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <Action
                  title="Reload Projects"
                  icon={Icon.ArrowClockwise}
                  onAction={revalidate}
                  shortcut={Keyboard.Shortcut.Common.Refresh}
                />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
