"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ExternalSearchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalSearchService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const constants_1 = require("../../common/constants");
let ExternalSearchService = ExternalSearchService_1 = class ExternalSearchService {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(ExternalSearchService_1.name);
    }
    async findCamerasByDateTime(dateTime) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(`${constants_1.TRAFFIC_IMAGE_API}?data_time=${dateTime}`)
            .pipe((0, rxjs_1.catchError)((error) => {
            this.logger.error(error.response?.data);
            throw "An error happened!";
        })));
        return data.items;
    }
};
exports.ExternalSearchService = ExternalSearchService;
exports.ExternalSearchService = ExternalSearchService = ExternalSearchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ExternalSearchService);
//# sourceMappingURL=external.search.service.js.map