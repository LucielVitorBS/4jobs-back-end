import { Router } from 'express'

import { authMiddleware } from './middlewares/auth'
import { errorMiddleware } from './utils/errorMiddleware'

import { AuthController } from '@controllers/AuthController'
import { CandidateController } from '@controllers/CandidateController'
import { CompanyController } from '@controllers/CompanyController'
import { JobController } from '@controllers/JobController'
import { userType } from './constants/user'
import { JobResponseController } from '@controllers/JobResponseController'

const router = Router()

const authController = new AuthController()

const candidateController = new CandidateController()

const companyController = new CompanyController()

const jobController = new JobController()

const jobResponseController = new JobResponseController()

// Authenticate routes
router.post('/authenticate', (req, res) => authController.authenticate(req, res))

// Candidate routes
router.post('/candidate', (req, res) => candidateController.create(req, res))

// Company routes
router.post('/company', (req, res) => companyController.create(req, res))

// Job routes
router.post('/jobs', authMiddleware(userType.company), (req, res) => jobController.create(req, res))

router.get('/jobs', authMiddleware(userType.company), (req, res) => jobController.getJobs(req, res))

router.get('/jobs/:jobId/preview', (req, res) => jobController.getPreview(req, res))

// Job response routes
router.post('/jobsResponse/linkCandidateJob', authMiddleware(userType.candidate), (req, res) => jobResponseController.linkCandidateJob(req, res))

router.get('/jobsResponse/:id', authMiddleware(userType.candidate), (req, res) => jobResponseController.getById(req, res))

router.get('/jobsResponse', authMiddleware(userType.candidate), (req, res) => jobResponseController.getList(req, res))

router.post('/jobsResponse/replyForm/:jobResponseId', authMiddleware(userType.candidate), (req, res) => jobResponseController.replyForm(req, res))

router.use(errorMiddleware)

export { router }
