import { API_SPEC_PATH, NavItem } from "@swirl/lib/navigation";
import OASNormalize from "oas-normalize";
import { ApiDocumentation } from "./docs.model";
import OASBuilder from "./oasBuilder";

export class ApiDocumentationsFacade {
  static _apiDocumentations: ApiDocumentation[];
  static _navItems: NavItem[];

  static get apiDocumentations(): Promise<ApiDocumentation[]> {
    if (ApiDocumentationsFacade._apiDocumentations) {
      return Promise.resolve(ApiDocumentationsFacade._apiDocumentations);
    }

    return new Promise(async (resolve) => {
      const oasDocument = await new OASNormalize(
        `${API_SPEC_PATH}/merged.yml`,
        {
          enablePaths: true,
        }
      ).validate();

      const oasBuilder = await new OASBuilder(oasDocument).dereference();
      const apiDocumentations =
        oasBuilder.setApiDocumentations().apiDocumentations;

      this._apiDocumentations = apiDocumentations;

      resolve(this._apiDocumentations);
    });
  }

  static get navItems(): Promise<NavItem[]> {
    if (ApiDocumentationsFacade._navItems) {
      return Promise.resolve(ApiDocumentationsFacade._navItems);
    }

    return new Promise(async (resolve) => {
      const apiDocumentations = await ApiDocumentationsFacade.apiDocumentations;

      const navItems: NavItem[] = apiDocumentations.map((api) => ({
        title: api.title,
        url: `/api-docs/${api.id}/${api.resources[0].id}`,
        children: api.resources.map((resource) => ({
          children: resource.endpoints.map((endpoint) => ({
            title: endpoint.title,
            tag: endpoint.method,
            url: `/api-docs/${api.id}/${resource.id}#${endpoint.id}`,
          })),
          isRoot: true,
          title: resource.title,
          url: `/api-docs/${api.id}/${resource.id}`,
        })),
        description: "",
        isRoot: true,
      }));

      ApiDocumentationsFacade._navItems = navItems;

      resolve(ApiDocumentationsFacade._navItems);
    });
  }
}
