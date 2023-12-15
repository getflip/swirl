import { sort } from "fast-sort";
import { API_SPEC_PATH, NavItem } from "@swirl/lib/navigation";
import OASNormalize from "oas-normalize";
import { ApiDocumentation, ApiEndpoint, Endpoint } from "./docs.model";
import OASBuilder from "./oasBuilder";

export class ApiDocumentationsFacade {
  private static _apiDocumentations: ApiDocumentation[];
  private static _navItems: NavItem[];

  private static _endpointMethodOrder: Record<string, number> = {
    GET: 1,
    POST: 2,
    PUT: 3,
    PATCH: 4,
    DELETE: 5,
    HEAD: 6,
    OPTIONS: 7,
    TRACE: 8,
  };

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

  private static getEndpointMethodOrder(endpoint: ApiEndpoint): number {
    return (
      this._endpointMethodOrder[endpoint.method?.toUpperCase() || ""] ||
      Number.MAX_SAFE_INTEGER
    );
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
        children: api.resources.map((resource) => {
          return {
            children: sort(resource.endpoints)
              .asc([(endpoint) => endpoint.path, this.getEndpointMethodOrder])
              .map((e) => {
                return e;
              })
              .map((endpoint) => ({
                title: endpoint.title,
                tag: endpoint.method,
                url: `/api-docs/${api.id}/${resource.id}#${endpoint.id}`,
              })),
            isRoot: true,
            title: resource.title,
            url: `/api-docs/${api.id}/${resource.id}`,
          };
        }),
        description: "",
        isRoot: true,
      }));

      ApiDocumentationsFacade._navItems = navItems;

      resolve(ApiDocumentationsFacade._navItems);
    });
  }
}
